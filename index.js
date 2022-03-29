const schedule = require('node-schedule');

Date.prototype.setHourTime = function (numberOfHours, startHour) {
    let hour = startHour ? startHour : 8;

    this.setTime(new Date(this.getFullYear(), this.getMonth(), this.getDate(), hour).getTime() + numberOfHours * 60 * 60 * 1000);

    return this;
}

const startTime = new Date().setHourTime(15); // Start every morning 08:00 AM (count: 0)
const endTime = new Date().setHourTime(15.84); // Stop every evening 05:30 PM  (count: 9.5)
console.log(`starTime: ${startTime.getTime()} ${startTime.toLocaleString()} \nendTime: ${endTime.getTime()} ${endTime.toLocaleString()}`);

const runSchedule = () => {
    let remainingTime = null;

    schedule.scheduleJob({
        start: startTime,
        end: endTime,
        rule: '*/1 * * * * *',
    }, () => {
        console.log('Tea time!');

        remainingTime = endTime.getTime() - Date.now(startTime);

        console.log('remainingTime: ', remainingTime);
        if (remainingTime < 0) console.log('Set expired to 0!!!');
    });
}

runSchedule();

process.on('SIGINT', () => {
    console.log('user exit the program');

    schedule.gracefulShutdown()
        .then(() => process.exit(0))
});