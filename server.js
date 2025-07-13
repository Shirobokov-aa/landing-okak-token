const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'send-tokens.html'));
});

// API для получения информации о токене
app.get('/api/token-info', (req, res) => {
    res.json({
        name: 'OkakCat',
        symbol: 'OKAK',
        mint: 'FTpcEYLwQYJmQFQYiLKpz6fKH5FXS2xxxtWAEJVn27Jm',
        totalSupply: '1000000000000000',
        decimals: 9,
        description: 'Мемкоин удивленных котов на Solana'
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📱 Откройте браузер и перейдите по адресу выше`);
    console.log(`🐱 OkakCat Token Sender готов к работе!`);
});
