import { utilities, WinstonModule } from 'nest-winston';
import process from 'process';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
const { combine, timestamp, printf } = winston.format;

const logDir = 'logs'; // logs 디렉토리 하위에 로그 파일 저장

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const productionTransports = () => [
  // info 레벨 로그를 저장할 파일 설정
  new winstonDaily({
    level: 'info',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    filename: `%DATE%.info.log`,
    maxFiles: 30,
    zippedArchive: true,
  }),
  // warn 레벨 로그를 저장할 파일 설정
  new winstonDaily({
    level: 'warn',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    filename: `%DATE%.warn.log`,
    maxFiles: 30,
    zippedArchive: true,
  }),
  // error 레벨 로그를 저장할 파일 설정
  new winstonDaily({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: logDir,
    filename: `%DATE%.error.log`,
    maxFiles: 30,
    zippedArchive: true,
  }),
];

const localTransports = () => [
  new winston.transports.Console({
    level: 'silly', // 모든 단계를 로그
    format: winston.format.combine(
      winston.format.timestamp(),
      utilities.format.nestLike('APP', {
        prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
        colors: true, // 로그에 색깔을 넣어서 출력
      })
    ),
  }),
];

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const winstonLogger = WinstonModule.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports:
    process.env['NODE_ENV'] === 'production'
      ? productionTransports()
      : localTransports(),
});

// morgan winston 설정
const stream = {
  write: (message) => {
    winstonLogger.log(message);
  },
};

export { stream, winstonLogger };
