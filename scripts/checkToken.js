const { Connection, PublicKey } = require("@solana/web3.js");
const { getMint, TOKEN_PROGRAM_ID } = require("@solana/spl-token");

// Подключение к локальной ноде
const connection = new Connection("http://127.0.0.1:8899", "confirmed");

// Различные Program ID для проверки
const PROGRAM_IDS = [
  { name: "TOKEN_PROGRAM_ID", id: TOKEN_PROGRAM_ID },
  { name: "TOKEN_2022_PROGRAM_ID (из библиотеки)", id: new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb") },
  { name: "Другой возможный TOKEN_2022", id: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
];

const tokenMint = new PublicKey("8F3qWVD3mVS98FmZp1Ns7rgH9QLgRF3qmRPz8XWNk2SY");

async function checkToken() {
  try {
    console.log("🔍 Проверяем токен:", tokenMint.toString());
    console.log("=" * 50);

    // Проверяем подключение
    const version = await connection.getVersion();
    console.log(`✅ Подключение к сети успешно. Версия: ${version["solana-core"]}`);

    // Получаем информацию об аккаунте
    console.log("\n📋 Информация об аккаунте:");
    const accountInfo = await connection.getAccountInfo(tokenMint);

    if (!accountInfo) {
      console.log("❌ Аккаунт не найден в сети!");
      return;
    }

    console.log(`✅ Аккаунт найден!`);
    console.log(`   Owner: ${accountInfo.owner.toString()}`);
    console.log(`   Lamports: ${accountInfo.lamports}`);
    console.log(`   Data length: ${accountInfo.data.length}`);
    console.log(`   Executable: ${accountInfo.executable}`);

    // Проверяем в каких программах токен может существовать
    console.log("\n🔍 Проверяем в разных программах:");

    for (const program of PROGRAM_IDS) {
      try {
        console.log(`\n--- Проверяем ${program.name} ---`);
        console.log(`Program ID: ${program.id.toString()}`);

        const mintInfo = await getMint(
          connection,
          tokenMint,
          "confirmed",
          program.id
        );

        console.log(`✅ НАЙДЕН в ${program.name}!`);
        console.log(`   Mint Authority: ${mintInfo.mintAuthority}`);
        console.log(`   Supply: ${mintInfo.supply}`);
        console.log(`   Decimals: ${mintInfo.decimals}`);
        console.log(`   Freeze Authority: ${mintInfo.freezeAuthority}`);
        console.log(`   Is Initialized: ${mintInfo.isInitialized}`);

        // Если найден, это наш Program ID
        return program.id;

      } catch (error) {
        console.log(`❌ Не найден в ${program.name}`);
        console.log(`   Ошибка: ${error.message}`);
      }
    }

    console.log("\n❌ Токен не найден ни в одной из известных программ!");

  } catch (error) {
    console.error("❌ Общая ошибка:", error);
  }
}

// Дополнительная функция для проверки всех аккаунтов программы
async function checkProgramAccounts() {
  console.log("\n🔍 Проверяем все аккаунты TOKEN_2022 программы:");

  const programId = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

  try {
    const accounts = await connection.getProgramAccounts(programId);
    console.log(`Найдено ${accounts.length} аккаунтов в программе`);

    accounts.forEach((account, index) => {
      console.log(`${index + 1}. ${account.pubkey.toString()}`);
      if (account.pubkey.toString() === tokenMint.toString()) {
        console.log("   ⭐ Это наш токен!");
      }
    });

  } catch (error) {
    console.log("❌ Ошибка при получении аккаунтов программы:", error.message);
  }
}

async function main() {
  await checkToken();
  await checkProgramAccounts();
}

main();
