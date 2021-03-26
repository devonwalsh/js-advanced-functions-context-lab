/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(array) {
    let obj = [];
    
    array.forEach(employee => {
        let newEmployee = createEmployeeRecord(employee);
        obj.push(newEmployee);
    });
    
    return obj;
}

function createTimeInEvent(timeStamp) {

    let dateTime = timeStamp.split(' ');
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }

    this['timeInEvents'].push(timeIn);
    return this;
}

function createTimeOutEvent(timeStamp) {

    let dateTime = timeStamp.split(' ');
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    }

    this['timeOutEvents'].push(timeOut);
    return this;
}

function hoursWorkedOnDate(recordDate) {
    let clockIn = this["timeInEvents"].find(obj => obj.date === recordDate)
    let clockOut = this["timeOutEvents"].find(obj => obj.date === recordDate)
    return (clockOut.hour - clockIn.hour)/100;
}

function wagesEarnedOnDate(recordDate) {
    let hoursWorked = hoursWorkedOnDate.call(this, recordDate)
    return hoursWorked * this["payPerHour"];
}

function findEmployeeByFirstName(srcArray, inputName) {
    return srcArray.find(obj => obj.firstName === inputName)
}

function calculatePayroll(employeeRecords) {
    let employeeWages = []
    employeeRecords.forEach(record => employeeWages.push(allWagesFor.call(record)));

    let sum = (accumulator, currentValue) => accumulator + currentValue;
    return employeeWages.reduce(sum);
}