const { Connection, Keypair, PublicKey, clusterApiUrl } = require("@solana/web3.js");
const {
    setAuthority,
    AuthorityType,
    getMint,
    TOKEN_2022_PROGRAM_ID
} = require("@solana/spl-token");

// Подключение к локальной ноде
const connection = new Connection("http://127.0.0.1:8899", "confirmed");

// Правильный Program ID для TOKEN_2022
const CORRECT_TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

// Приватный ключ (64 байта)
const payer = Keypair.fromSecretKey(
  Uint8Array.from([
    178,25,165,33,161,66,112,101,65,253,179,29,185,144,27,246,
    106,41,149,31,247,49,60,244,80,243,71,98,52,143,181,170,
    77,84,31,173,84,67,141,188,18,116,147,124,238,45,140,10,
    159,102,125,88,201,150,65,221,40,127,152,29,225,14,37,42
  ])
);

const tokenMint = new PublicKey("2sknFoLgVYwXrE8ACKEQLyxEuFWgvky9hb8izDpvayBh");

async function disableTokenMint() {
  try {
    console.log("Проверяем подключение к сети...");

    // Проверяем подключение
    const version = await connection.getVersion();
    console.log(`✅ Подключение к сети успешно. Версия: ${version["solana-core"]}`);

    // Проверяем баланс плательщика
    const balance = await connection.getBalance(payer.publicKey);
    console.log(`💰 Баланс плательщика: ${balance / 1000000000} SOL`);

    if (balance === 0) {
      console.log("⚠️  Внимание: У плательщика нет SOL для оплаты транзакции!");
      return;
    }

    console.log("Проверяем существование токена...");

    // Сначала проверим с правильным TOKEN_2022_PROGRAM_ID
    let mintInfo;
    let programId = CORRECT_TOKEN_2022_PROGRAM_ID;

    try {
      mintInfo = await getMint(
        connection,
        tokenMint,
        "confirmed",
        CORRECT_TOKEN_2022_PROGRAM_ID
      );
      console.log("✅ Токен найден в TOKEN_2022_PROGRAM");
    } catch (error) {
      console.log("❌ Токен не найден в TOKEN_2022_PROGRAM, пробуем обычный TOKEN_PROGRAM...");

      // Попробуем с обычным TOKEN_PROGRAM_ID
      const { TOKEN_PROGRAM_ID } = require("@solana/spl-token");
      try {
        mintInfo = await getMint(
          connection,
          tokenMint,
          "confirmed",
          TOKEN_PROGRAM_ID
        );
        programId = TOKEN_PROGRAM_ID;
        console.log("✅ Токен найден в обычном TOKEN_PROGRAM");
      } catch (error2) {
        console.log("❌ Токен не найден ни в одной из программ");
        console.log("Проверьте:");
        console.log("1. Правильность адреса токена");
        console.log("2. Работает ли локальная нода Solana");
        console.log("3. Создан ли токен в этой сети");
        return;
      }
    }

    console.log(`Текущий mint authority: ${mintInfo.mintAuthority}`);
    console.log(`Текущий supply: ${mintInfo.supply}`);
    console.log(`Decimals: ${mintInfo.decimals}`);

    // Проверяем, что payer является mint authority
    if (mintInfo.mintAuthority?.toString() !== payer.publicKey.toString()) {
      console.log("❌ Ошибка: Плательщик не является mint authority!");
      console.log(`Ожидается: ${payer.publicKey.toString()}`);
      console.log(`Фактический: ${mintInfo.mintAuthority?.toString()}`);
      return;
    }

    // Проверяем, не отключен ли уже минт
    if (mintInfo.mintAuthority === null) {
      console.log("ℹ️  Минт уже отключен!");
      return;
    }

    console.log("Отключаем возможность минта...");

    // Отключаем минт, установив authority в null
    const transactionSignature = await setAuthority(
      connection,
      payer,
      tokenMint,
      payer.publicKey, // Текущий mint authority
      AuthorityType.MintTokens,
      null, // Новый authority (null = отключить)
      [],
      undefined,
      programId
    );

    console.log(`✅ Минт успешно отключен! Транзакция: ${transactionSignature}`);
    console.log(`Проверить: https://explorer.solana.com/tx/${transactionSignature}?cluster=custom`);

  } catch (error) {
    console.error("❌ Ошибка:", error);
    console.log("\nВозможные причины:");
    console.log("1. Токен не существует в сети");
    console.log("2. Неправильный адрес токена");
    console.log("3. Локальная нода Solana не запущена");
    console.log("4. Недостаточно SOL для транзакции");
  }
}

disableTokenMint();
