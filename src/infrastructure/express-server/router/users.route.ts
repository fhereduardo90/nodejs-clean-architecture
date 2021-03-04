import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import {
  findUsers,
  createUser,
} from '../../../interface/controllers/users.controller'

const router = express.Router()

export function userRoutes(): Router {
  router.route('/').get(asyncHandler(findUsers)).post(asyncHandler(createUser))

  return router
}
