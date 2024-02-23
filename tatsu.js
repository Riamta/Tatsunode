const client = require('./client');
const fs = require('fs').promises; // Import the filesystem module
const utils = require('./utils');
const datafile = 'data.json';

async function getData() {
    const data = await utils.getData();
    const tatsuData = data['tatsu'];
    utils.logWaitingWithTime('Đang đọc file data...')
    if (tatsuData) {
        utils.logWithTime('Đã tìm thấy file data');
        utils.logWithTime('Đang khởi chạy tatsu...');
        return tatsuData;
    }
    else {
        utils.logWaitingWithTime('Không tìm thấy file data, vui lòng nhập thông tin để tạo file data mới.');
        const tatsuData = await inputData();
        await saveData(tatsuData);
        utils.logWithTime('Đang khởi chạy tatsu...');
        return tatsuData;
    }
}
async function inputData() {
    const data = await new Promise((resolve) => {
        utils.rl.question('Channel ID: ', (answer) => {
            resolve(answer);
        });
    });
    return { channelId: data };
}
async function saveData(tatsuData) {
    try {
        const currentData = await fs.readFile(datafile, 'utf8');
        const data = JSON.parse(currentData);
        data['tatsu'] = tatsuData;
        await fs.writeFile(datafile, JSON.stringify(data, null, 2), 'utf8');
        utils.logWithTime('Thêm dữ liệu vào tệp thành công');
    } catch (error) {
        utils.logErrorWithTime('Lỗi khi đọc hoặc ghi tệp:', error.message);
    }
}
async function tatsu() {
    const data = await getData();
    const channel = client.channels.cache.get(data['channelId']);
    if (!channel) { utils.logWithTime('Không tìm thấy channel'); return; }
    while (true) {
        await utils.delay(5000);
        await channel.send('t!tg feed');
        utils.logWithTime('Đã cho ăn');
        await utils.delay(5000);
        for (let i = 0; i < 3; i++) {
            await channel.send('t!tg walk');
            utils.logWithTime('Đã đi dạo');
            await utils.delay(5000);
        }
        await utils.delay(5000);
    }
}

module.exports = {
    tatsu
};