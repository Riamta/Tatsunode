const { Client } = require('discord.js-selfbot-v13');
const readline = require('readline');
const fs = require('fs').promises; // Import the filesystem module
const chalk = require('chalk');

const client = new Client();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const datafile = 'data.json';
var channelId_ = 'channelId';
var token_ = '';
async function getCredentials() {
    try {
        // Try to read the existing credentials from the file
        const data = await fs.readFile(datafile, 'utf8');
        const credentials = JSON.parse(data);
        logWithTime('Đang đọc file save...')
        logWithTime('Đã tìm thấy file save, đang đăng nhập...');
        return credentials;
    } catch (error) {
        // If the file doesn't exist or there's an error reading it, ask for input
        logWithTime('Không tìm thấy file save, vui lòng nhập thông tin để tạo file save mới.');
        const newz = await inputCredentials();
        await saveCredentials({ token: newz.token, channelId: newz.channelId }); // Save the credentials after login
        return newz;
    }
}
async function inputCredentials() {
    const newz = new Promise((resolve) => {
        rl.question('Discord token: ', (token) => {
            rl.question('Channel ID: ', (channelId) => {
                const credentials = { token, channelId };
                resolve(credentials);
            });
        });
    });
    return newz;
}
async function saveCredentials(credentials) {
    // Save the credentials to the file
    await fs.writeFile(datafile, JSON.stringify(credentials, null, 2), 'utf8');
    logWithTime('Tạo file save thành công');
}

client.on('ready', async () => {
    logWithTime(`Đã đăng nhập bằng tài khoản ${client.user.username}, channel ID: ${channelId_}`);
    tatsu();
});

async function tatsu() {
    const channel = client.channels.cache.get(channelId_);
    if (!channel) return console.log('Invalid channel ID');
    while (true) {
        await delay(5000);
        await channel.send('t!tg feed');
        logWithTime('Đã cho ăn');
        await delay(5000);
        for (let i = 0; i < 3; i++) {
            await channel.send('t!tg walk');
            logWithTime('Đã đi dạo');
            await delay(5000);
        }
        await delay(5000);
    }
}
async function delay(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}
function logWithTime(message) {
    const date = new Date();
    const timeString = chalk.green(date.toLocaleTimeString());
    console.log(`[${timeString}] ${message}`);
}
async function login() {
    const credentials = await getCredentials();
    channelId_ = credentials.channelId;
    token_ = credentials.token;
    const { token, channelId } = credentials;
    client.login(token);
    // You can use channelId here as needed
}

login();

client.once('ready', async () => {
    rl.close();
});
