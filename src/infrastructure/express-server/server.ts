import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import cors, { CorsOptions } from 'cors'
import { HttpError } from 'http-errors'
import { IOCContainerInit } from '../../interface/ioc/container'
import logger, { expressLogger } from '../logger'
import { apiRouter } from './router'

const app = express()
const PORT = process.env.API_PORT || 3000
const ENVIROMENT = process.env.NODE_ENV || 'development'

app.use(expressLogger())
app.use(express.json())
app.use(express.urlencoded())

const whiteList = ['http://localhost:3000']
const corsOptionsDelegate = function handler(
  req: Request,
  callback: (err: Error | null, options?: CorsOptions) => void,
) {
  const corsOptions: { origin: boolean } = { origin: false }

  if (whiteList.indexOf(req.header('Origin') ?? '') !== -1) {
    corsOptions.origin = true
  }

  callback(null, corsOptions)
}

function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void {
  if (ENVIROMENT !== 'development') {
    logger.error(err.message)
    logger.error(err.stack || '')
  }

  res.status(err.status ?? 500)
  res.json(err)
}

app.use(cors(corsOptionsDelegate))

app.get('/api/v1/status', (req: Request, res: Response) => {
  res.json({ time: new Date() })
})
app.use('/', apiRouter(app))
app.use(errorHandler)

app.listen(PORT, () => {
  IOCContainerInit()
  logger.info(`Server listening on port %d, env: %s`, PORT, ENVIROMENT)
})
