const { Connection, Keypair, PublicKey, clusterApiUrl } = require("@solana/web3.js");
const { getAssociatedTokenAddress } = require("@solana/spl-token");
const fs = require("fs");

// Конфигурация
const MINT_ADDRESS = "FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm";
const KEYPAIR_PATH = "../id.json";
const NETWORK = "mainnet-beta";

async function checkBalance() {
    try {
        console.log("🐱 Проверка баланса OkakCat токенов");
        console.log("=====================================\n");

        // Загружаем ключ
        console.log("📁 Загрузка ключа...");
        const keypairData = JSON.parse(fs.readFileSync(KEYPAIR_PATH, "utf8"));
        const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
        console.log("✅ Ключ загружен:", keypair.publicKey.toString());

        // Подключение к Solana
        console.log("🔗 Подключение к Solana...");
        const connection = new Connection(clusterApiUrl(NETWORK), "confirmed");

        const mint = new PublicKey(MINT_ADDRESS);

        // Получаем адрес токен-аккаунта
        const tokenAccount = await getAssociatedTokenAddress(mint, keypair.publicKey);
        console.log("📍 Токен-аккаунт:", tokenAccount.toString());

        // Проверяем баланс
        console.log("💰 Проверка баланса...");
        const balance = await connection.getTokenAccountBalance(tokenAccount);

        console.log("\n📊 Результат:");
        console.log(`Баланс: ${balance.value.uiAmount} OKAK`);
        console.log(`Минимальные единицы: ${balance.value.amount}`);
        console.log(`Десятичные знаки: ${balance.value.decimals}`);

        // Проверяем SOL баланс
        const solBalance = await connection.getBalance(keypair.publicKey);
        console.log(`SOL баланс: ${solBalance / 1000000000} SOL`);

    } catch (error) {
        console.error("❌ Ошибка:", error.message);

        if (error.message.includes("TokenAccountNotFoundError")) {
            console.log("\n💡 Токен-аккаунт не найден!");
            console.log("Это означает, что у вас еще нет токенов на этом кошельке.");
            console.log("Нужно создать токен-аккаунт или получить токены.");
        }
    }
}

checkBalance();
