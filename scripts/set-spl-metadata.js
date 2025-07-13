const { Connection, Keypair, PublicKey, Transaction, clusterApiUrl } = require("@solana/web3.js");
const { createCreateMetadataAccountV3Instruction, PROGRAM_ID } = require("@metaplex-foundation/mpl-token-metadata");
const fs = require("fs");

const MINT = "FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm";
const NAME = "OkakCat";
const SYMBOL = "OKAK";
const URI = "https://raw.githubusercontent.com/Shirobokov-aa/bublik-metadata/refs/heads/main/sticker.png";
const KEYPAIR_PATH = "./id.json";

(async () => {
  try {
    console.log("🔗 Подключение к Solana mainnet-beta...");
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

    console.log("📁 Загрузка ключа из файла...");
    const keypairData = JSON.parse(fs.readFileSync(KEYPAIR_PATH, "utf8"));
    const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
    console.log("✅ Ключ загружен:", keypair.publicKey.toString());

    console.log("🔍 Проверка MINT адреса...");
    const mint = new PublicKey(MINT);
    console.log("✅ MINT адрес валиден:", mint.toString());

    const programId = new PublicKey(PROGRAM_ID);
    console.log("✅ Program ID:", programId.toString());

    console.log("🔍 Поиск PDA для метаданных...");
    const [metadataPDA] = await PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        programId.toBuffer(),
        mint.toBuffer(),
      ],
      programId
    );
    console.log("✅ Metadata PDA:", metadataPDA.toString());

    const dataV3 = {
      name: NAME,
      symbol: SYMBOL,
      uri: URI,
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    };

    console.log("📝 Создание инструкции для метаданных...");
    const ix = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint,
        mintAuthority: keypair.publicKey,
        payer: keypair.publicKey,
        updateAuthority: keypair.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: dataV3,
          isMutable: true,
          collectionDetails: null,
        },
      }
    );

    console.log("🚀 Отправка транзакции...");
    const tx = new Transaction().add(ix);
    const sig = await connection.sendTransaction(tx, [keypair]);
    console.log("✅ Метаданные созданы! Подпись:", sig);

    // Ждем подтверждения
    console.log("⏳ Ожидание подтверждения...");
    const confirmation = await connection.confirmTransaction(sig, "confirmed");
    console.log("✅ Транзакция подтверждена:", confirmation);

  } catch (error) {
    console.error("❌ Ошибка:", error.message);
    if (error.logs) {
      console.error("Логи:", error.logs);
    }
    process.exit(1);
  }
})();
