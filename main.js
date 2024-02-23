const fs = require('fs').promises; // Import the filesystem module
const utils = require('./utils');
const ts = require('./tatsu');
const client = require('./client');

const datafile = 'data.json';
var token_ = '';
async function getToken() {
    try {
        const data = await fs.readFile(datafile, 'utf8');
        const token = JSON.parse(data);
        utils.logWithTime('Đang đọc file save...')
        utils.logWithTime('Đã tìm thấy file save, đang đăng nhập...');
        return token;
    } catch (error) {
        utils.logWithTime('Không tìm thấy file save, vui lòng nhập thông tin để tạo file save mới.');
        const token = await inputToken();
        await saveToken(token); 
        return token;
    }
}
async function inputToken() {
    const token = await new Promise((resolve) => {
        utils.rl.question('Nhập token: ', (answer) => {
            resolve(answer);
        });
    });
    return { token };
}
async function saveToken(token) {
    await fs.writeFile(datafile, JSON.stringify(token));
    utils.logWithTime('Tạo file save thành công');
}

client.on('ready', async () => {
    utils.logWithTime(`Đã đăng nhập bằng tài khoản ${client.user.username}`);
    menu();
});
async function menu() {
    const menu = "1. Tatsu\n2. Mudae\n3. Exit";
    let choice = '';
    while (choice !== '1' && choice !== '2' && choice !== '3') {
        console.clear();
        const choice = await new Promise((resolve) => {
            utils.rl.question(menu + '\nChọn: ', (answer) => {
                resolve(answer);
            });
        });
        switch (choice) {
            case '1':
                ts.tatsu();
                break;
            case '2':
                break;
            case '3':
                process.exit();
                break;
            default:
                utils.logErrorWithTime('Lựa chọn không hợp lệ');
                break;
        }
    }
}

async function login() {
    const token = await getToken();
    client.login(token.token);
    // You can use channelId here as needed
}
login();

