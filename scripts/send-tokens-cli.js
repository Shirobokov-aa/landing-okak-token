const { Connection, Keypair, PublicKey, clusterApiUrl } = require("@solana/web3.js");
const { getAssociatedTokenAddress, createTransferInstruction, createAssociatedTokenAccountInstruction } = require("@solana/spl-token");
const fs = require("fs");
const readline = require("readline");

// Конфигурация
const MINT_ADDRESS = "FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm";
const KEYPAIR_PATH = "../id.json";
const NETWORK = "mainnet-beta";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function sendTokensCLI() {
    try {
        console.log("🐱 OkakCat Token Sender CLI");
        console.log("============================\n");

        // Загружаем ключ
        console.log("📁 Загрузка ключа...");
        const keypairData = JSON.parse(fs.readFileSync(KEYPAIR_PATH, "utf8"));
        const keypair = Keypair.fromSecretKey(new Uint8Array(keypairData));
        console.log("✅ Ключ загружен:", keypair.publicKey.toString());

        // Подключение к Solana
        console.log("🔗 Подключение к Solana...");
        const connection = new Connection(clusterApiUrl(NETWORK), "confirmed");

        // Запрашиваем данные у пользователя
        const walletAddress = await question("Введите адрес кошелька получателя: ");
        const amountStr = await question("Введите количество токенов для отправки: ");
        const message = await question("Введите сообщение (опционально): ");

        const amount = parseFloat(amountStr);
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Неверное количество токенов");
        }

        console.log("\n🚀 Отправка токенов...");
        console.log(`📤 Кому: ${walletAddress}`);
        console.log(`💰 Количество: ${amount} OKAK`);
        if (message) console.log(`💬 Сообщение: ${message}`);

        // Подтверждение
        const confirm = await question("\nПодтвердите отправку (y/n): ");
        if (confirm.toLowerCase() !== 'y') {
            console.log("❌ Отправка отменена");
            return;
        }

        const mint = new PublicKey(MINT_ADDRESS);
        const receiver = new PublicKey(walletAddress);

        // Получаем адреса токен-аккаунтов
        const senderTokenAccount = await getAssociatedTokenAddress(mint, keypair.publicKey);
        const receiverTokenAccount = await getAssociatedTokenAddress(mint, receiver);

        // Проверяем баланс
        const senderBalance = await connection.getTokenAccountBalance(senderTokenAccount);
        const requiredAmount = amount * Math.pow(10, 9);

        if (senderBalance.value.uiAmount < amount) {
            throw new Error(`Недостаточно токенов! У вас: ${senderBalance.value.uiAmount}, нужно: ${amount}`);
        }

        // Создаем транзакцию
        const { Transaction } = require("@solana/web3.js");
        const transaction = new Transaction();

        // Проверяем, существует ли токен-аккаунт получателя
        const receiverAccountInfo = await connection.getAccountInfo(receiverTokenAccount);

        if (!receiverAccountInfo) {
            console.log("📝 Создаем токен-аккаунт для получателя...");
            const createAccountIx = createAssociatedTokenAccountInstruction(
                keypair.publicKey,
                receiverTokenAccount,
                receiver,
                mint
            );
            transaction.add(createAccountIx);
        }

        // Добавляем перевод
        const transferIx = createTransferInstruction(
            senderTokenAccount,
            receiverTokenAccount,
            keypair.publicKey,
            requiredAmount
        );
        transaction.add(transferIx);

        // Отправляем транзакцию
        console.log("📡 Отправка транзакции...");
        const signature = await connection.sendTransaction(transaction, [keypair]);

        console.log("⏳ Ожидание подтверждения...");
        await connection.confirmTransaction(signature, "confirmed");

        console.log("\n🎉 Успешно отправлено!");
        console.log(`✅ Подпись транзакции: ${signature}`);
        console.log(`🔗 Solscan: https://solscan.io/tx/${signature}`);

    } catch (error) {
        console.error("❌ Ошибка:", error.message);
    } finally {
        rl.close();
    }
}

// Запускаем скрипт
sendTokensCLI();
