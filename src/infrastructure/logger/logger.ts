import morgan from 'morgan'
import { createLogger, format, transports } from 'winston'
import { RequestHandler } from 'express'

const loggerTransports = []

const isProduction = process.env.NODE_ENV === 'production'

loggerTransports.push(
  new transports.Console({
    format: format.combine(format.colorize(), format.splat(), format.simple()),
    level: isProduction ? 'error' : 'info',
  }),
)

const logger = createLogger({ transports: loggerTransports })
const expressFormat = isProduction ? 'combined' : 'dev'
const stream = {
  write(message: string): void {
    logger.info(message)
  },
}

export const expressLogger = (): RequestHandler =>
  morgan(expressFormat, { stream })

export default logger
