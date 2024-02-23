const chalk = require('chalk');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function delay(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}
function logWithTime(message) {
    const date = new Date();
    const timeString = chalk.green(date.toLocaleTimeString());
    console.log(`[${timeString}] ${message}`);
}
function logErrorWithTime(message) {
    const date = new Date();
    const timeString = chalk.red(date.toLocaleTimeString());
    console.log(`[${timeString}] ${message}`);
}
function logWaitingWithTime(message) {
    const date = new Date();
    const timeString = chalk.yellow(date.toLocaleTimeString());
    console.log(`[${timeString}] ${message}`);
}
module.exports = {
    rl,
    logWaitingWithTime,
    logErrorWithTime,
    logWithTime,
    delay
};
