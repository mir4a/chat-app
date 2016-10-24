import { Logger } from 'meteor/ostrio:logger';
import { LoggerFile } from 'meteor/ostrio:loggerfile';
import { LoggerConsole } from 'meteor/ostrio:loggerconsole';
import path from 'path';

const log = new Logger();

(new LoggerConsole(log, {
  format(opts) {
    return `${((Meteor.isServer)
      ? '[SERVER]'
      : '[CLIENT]')} [${opts.level}] - ${opts.message}`;
  },
})).enable();

const BASE_PATH = path.resolve('./').split('.meteor')[0];
const LOG_PATH = path.resolve(BASE_PATH, './logs/');

// Initialize LoggerFile:
const LogFile = new LoggerFile(log, {
  fileNameFormat(time) {
    /* Create log-files hourly */
    return `${(time.getDate())}-${(time.getMonth() + 1)}-${(time.getFullYear())}_${(time.getHours())}.log`;
  },
  format(time, level, message, data, userId) {
    /* Omit Date and hours from messages */
    return `[${level}] | ${(time.getMinutes())}:${(time.getSeconds())} | "${message}" | User: ${userId}\r\n`;
  },
  path: LOG_PATH,
});

// Enable LoggerFile with default settings
LogFile.enable();


Meteor.startup(() => {
  log.info('Welcome to Awesome Chat App!');
  log.info('=========================');
  // log.info('Some info string ', {test: 'Info Data'});
  // log.info('(no data object) Some info string ');
  // log.debug('Some debug string ', {test: 'Debug Data'});
  // log.debug('(no data object) Some debug string ');
  // log.error('Some error string ', {test: 'Error Data'});
  // log.error('(no data object) Some error string ');
  // log.fatal('Some fatal string ', {test: 'Fatal Data'});
  // log.fatal('(no data object) Some fatal string');
  // log.warn('Some warn string ', {test: 'Warn Data'});
  // log.warn('(no data object) Some warn string ');
  // log.trace('Some trace string ', {test: 'Trace Data'});
  // log.trace('(no data object) Some trace string ');
  // log._('_ ', {test: '_'});
  // log._('(no data object) _ ');
});

export default log;
