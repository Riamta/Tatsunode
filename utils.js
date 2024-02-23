const readline = require('readline');
const fs = require('fs').promises; // Import the filesystem module
const datafile = 'data.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
async function getData() {
    const data = await fs.readFile(datafile, 'utf8');
    const datajson = JSON.parse(data);
    return datajson;
}

async function delay(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}
function logWithTime(message) {
    const date = new Date();
    const timeString = (date.toLocaleTimeString());
    console.log(`[${timeString}] ${message}`);
}
function logErrorWithTime(message) {
    const date = new Date();
    const timeString = (date.toLocaleTimeString());
    console.log(`[${timeString}] ${message}`);
}
function logWaitingWithTime(message) {
    const date = new Date();
    const timeString = (date.toLocaleTimeString());
    console.log(`[${timeString}] ${message}`);
}
module.exports = {
    rl,
    logWaitingWithTime,
    logErrorWithTime,
    logWithTime,
    delay,
    getData
};
