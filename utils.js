const chalk = require('chalk');

async function delay(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}
function logWithTime(message) {
    const date = new Date();
    const timeString = chalk.green(date.toLocaleTimeString());
    console.log(`[${timeString}] ${message}`);
}
module.exports = {
    logWithTime,
    delay
};