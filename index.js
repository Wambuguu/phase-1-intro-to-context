// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10),
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10),
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOut = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
    return totalWages + wagesEarnedOnDate(employeeRecord, timeInEvent.date);
  }, 0);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPayroll, employeeRecord) => {
    return totalPayroll + allWagesFor(employeeRecord);
  }, 0);
}
