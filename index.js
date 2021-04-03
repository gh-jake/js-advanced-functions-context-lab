/* Your Code Here */
let createEmployeeRecord = function (employeeInfo) {
    return {
        firstName: employeeInfo[0] ,
        familyName: employeeInfo[1] ,
        title: employeeInfo[2] ,
        payPerHour: employeeInfo[3] ,
        timeInEvents: [] ,
        timeOutEvents: []
    };
}

let createEmployeeRecords = function (employees) {
    return employees.map(employee => createEmployeeRecord(employee));
}

let createTimeInEvent = function (dateStamp) {
    let timeInEvent = {
        type: "TimeIn",
        date: dateStamp.split(" ")[0] ,
        hour: parseInt(dateStamp.split(" ")[1])
    }
    this.timeInEvents.push(timeInEvent);
    return this;
}

let createTimeOutEvent = function (dateStamp) {
    let timeOutEvent = {
        type: "TimeOut",
        date: dateStamp.split(" ")[0] ,
        hour: parseInt(dateStamp.split(" ")[1])
    }
    this.timeOutEvents.push(timeOutEvent);
    return this;
}

let hoursWorkedOnDate = function (dateStamp) {
    let timeOutHour = this.timeOutEvents.find(e => e.date === dateStamp).hour;
    let timeInHour = this.timeInEvents.find(e => e.date === dateStamp).hour;
    return (timeOutHour - timeInHour) / 100;
}

let wagesEarnedOnDate = function (dateStamp) {
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp);
}

let findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(array => array.firstName === firstName);
}

let calculatePayroll = function (employees) {
    let pay = employees.map(employee => allWagesFor.bind(employee)());
    return pay.reduce((added, start) => added + start);
}

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