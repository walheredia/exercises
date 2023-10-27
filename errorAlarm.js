//error codes and messages supported for the alarm system
const errorCodeMap = {
  1: 'Low Voltage Battery.',
  2: 'High Voltage Battery.',
  3: 'Transmission Control System Malfunction.',
  4: 'Oxygen Sensor Problem.',
  5: 'Engine Cooling System Performance.',
  6: 'Cylinder 1 Misfire Detected',
  7: 'Cylinder 2 Misfire Detected',
  8: 'Cylinder 3 Misfire Detected',
  9: 'Cylinder 4 Misfire Detected',
  10: 'Engine Coolant Temperature Sensor Circuit Low',
  11: 'Engine Oil Pressure Sensor',
  12: 'Left Front Wheel Speed Sensor Circuit',
  13: 'Right Front Wheel Speed Sensor Circuit',
  14: 'Left Rear Wheel Speed Sensor Circuit',
  15: 'Right Rear Wheel Speed Sensor Circuit',
  16: 'Exhaust Gas Recirculation (EGR) Flow Insufficient'
}

//thresholds configuration
let errorThresholdForNotification = 11;
let errorThresholdTimeForNotification = 60000; //(1 minute)

let lastNotificationTime = null;
let errorMemoryTracking = [];
let errorsToNotify = [];

// Function to log an error with a given error code
function logError(errorCode){
  const currentTime = new Date().getTime();
  // Store the error with a timestamp
  errorMemoryTracking.push({
    errorCode: errorCode,
    time: currentTime
  })
  // Check if the error threshold is reached and if it's time for a notification
  if(thresholdErrorsReached(currentTime) && thresholdTimeReached(currentTime)){
    sendEmailNotification(currentTime);
    errorMemoryTracking = [];
    lastNotificationTime = currentTime;
    errorsToNotify = [];
  }
  console.log(`Error code ${errorCode} logged sucessfully`);
}

// Function to check if the error threshold is reached
function thresholdErrorsReached(currentTime){
  const threshold = currentTime - errorThresholdTimeForNotification;
  const recentRecords = errorMemoryTracking.filter(error => error.time >= threshold);
  if(recentRecords.length >= errorThresholdForNotification){
    errorsToNotify = recentRecords;
    return true;
  } else {
    return false;
  }
}

// Function to check if the time threshold is reached
function thresholdTimeReached(currentTime){
  if(!lastNotificationTime){
    return true;
  }
  if((currentTime - lastNotificationTime) >= errorThresholdTimeForNotification){
    return true;
  }
  return false;
}

// Function to send an email notification
function sendEmailNotification(currentTime){
  console.log(`Email Notification - Date: ${new Date(currentTime)}`);
  console.log(`We want to inform you that there has been a significant increase in errors recently.`);
  console.log(`${errorsToNotify.length} errors have ocurred in the established period of ${errorThresholdTimeForNotification / 1000 / 60} minute/s `);
  console.log(`During that time, we detected the following errors:`);
  errorsToNotify.forEach(error => {
    console.log(' * ' + errorCodeMap[error.errorCode]);
  });
  console.log(`Please refer to log files for more information.`);
}


//Testing functionality
let intervalOscilation = 1200;

let interval = setInterval(() => {
  logError(Math.floor(Math.random() * 16) + 1);
}, intervalOscilation);

// Interval to change the interval oscillation time
const changeIntervalOscilation = setInterval(() => {
  if(intervalOscilation === 1200){
    intervalOscilation = 15000;
  } else if (intervalOscilation === 10000){
    intervalOscilation = 1200;
  } else {
    intervalOscilation = 10000;
  }
  clearInterval(interval);
  interval = setInterval(() => {
    logError(Math.floor(Math.random() * 16) + 1);
  }, intervalOscilation);
}, 17000);