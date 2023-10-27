At the end of the code (errorAlarm.js), there is a 'Testing Functionality' section, the purpose of which is to call the 'logError' function
at different time intervals. It allows us to verify that the process complies with the suggestions:
* If more than ten errors occur in one minute, an email notification is sent.
* 'logError' does not write any log files; it is simulated by the message 'Error code x logged successfully,' 
  as seen in the console when executed.
* The email notification (also simulated) includes only the errors that occurred in the last minute and without limit.
  If you wish to generate a larger quantity of errors, you should modify the testing section with shorter intervals, 
  for example, every 3 seconds, to make it easier to observe.
* It's only possible to send one email notification per minute.

Additional information:
It's possible to adjust the number of errors you wish to receive and the time limit for email notifications using these parameters:
1) errorThresholdForNotification:
   - This parameter allows you to specify the desired quantity of errors. For example, if you want to receive notifications after only 5 errors, set it to 5.
2) errorThresholdTimeForNotification:
   - This parameter defines the time frame for error accumulation in milliseconds. If you want to receive notifications within a 30-second window, you can set it to 30,000 milliseconds.
