const client = require('./client');
const fs = require('fs').promises; // Import the filesystem module
const utils = require('./utils');
const datafile = 'data.json';


async function getData() {
    const data = await utils.getData();
    const mudaeData = data['mudae'];
    utils.logWaitingWithTime('Đang đọc file data mudae...')
    if (mudaeData) {
        utils.logWithTime('Đã tìm thấy file data mudae');
        utils.logWithTime('Đang khởi chạy automudae...');
        return mudaeData;
    }
    else {
        utils.logWaitingWithTime('Không tìm thấy file data mudae, vui lòng nhập thông tin để tạo file data mới.');
        const mudaeData = await inputData();
        await saveData(mudaeData);
        utils.logWithTime('Đang khởi chạy automudae...');
        return mudaeData;
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
async function saveData(mudaeData) {
    try {
        const currentData = await fs.readFile(datafile, 'utf8');
        const data = JSON.parse(currentData);
        data['mudae'] = mudaeData;
        await fs.writeFile(datafile, JSON.stringify(data, null, 2), 'utf8');
        utils.logWithTime('Thêm dữ liệu vào file thành công');
    } catch (error) {
        utils.logErrorWithTime('Lỗi khi đọc hoặc ghi tệp:', error.message);
    }
}

async function mudae() {
    const data = await getData();
    const channel = client.channels.cache.get(data['channelId']);
    if (!channel) { utils.logWithTime('Không tìm thấy channel'); return; }
    // while (true) {
        
    //     }
    //     await utils.delay(5000);
    // }
}

client.on("messageCreate", async (message) => {
    const data = await utils.getData();
    const mudaeData = data['mudae'];
    const userToken = "432610292342587392"; 
    if (message.author.id === userToken) {
        if (message.embeds.length > 0 && message.embeds[0]['color'] == 16751916) {
            console.log('Received an embed message:', message.embeds[0]);
            const series = message.embeds[0]['description']
            const charName = message.embeds[0]['author']['name']
            if (mudaeData && (mudaeData['seriesName'].includes(series) || mudaeData['charName'].includes(charName))) {
                if (message.components && message.components.length > 0) {
                    console.log('Message has interactive button');
                    message.clickButton(message.components[0]['components'][0].customId);
                }
                
            }
        } 
    }
});


module.exports = {
    mudae
};