const { Connection, Keypair, PublicKey, Transaction, clusterApiUrl } = require("@solana/web3.js");
const { createUpdateMetadataAccountV2Instruction, PROGRAM_ID } = require("@metaplex-foundation/mpl-token-metadata");
const fs = require("fs");

const MINT = "FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm";
const NEW_URI = "https://raw.githubusercontent.com/Shirobokov-aa/bublik-metadata/main/metadata.json"; // Новый URI на JSON
const KEYPAIR_PATH = "./id.json";

(async () => {
  try {
    console.log("🔗 Подключение к Solana mainnet-beta...");
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

    console.log("📁 Загрузка ключа из файла...");
    const keypairData = JSON.parse(fs.readFileSync(KEYPAIR_PATH, "utf8"));
    const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
    console.log("✅ Ключ загружен:", keypair.publicKey.toString());

    const mint = new PublicKey(MINT);
    const programId = new PublicKey(PROGRAM_ID);

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

    console.log("📝 Создание инструкции для обновления метаданных...");
    const ix = createUpdateMetadataAccountV2Instruction(
      {
        metadata: metadataPDA,
        updateAuthority: keypair.publicKey,
      },
      {
        updateMetadataAccountArgsV2: {
          data: {
            name: "OkakCat",
            symbol: "OKAK",
            uri: NEW_URI,
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          },
          updateAuthority: keypair.publicKey,
          primarySaleHappened: null,
          isMutable: true,
        },
      }
    );

    console.log("🚀 Отправка транзакции обновления...");
    const tx = new Transaction().add(ix);
    const sig = await connection.sendTransaction(tx, [keypair]);
    console.log("✅ Метаданные обновлены! Подпись:", sig);

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
