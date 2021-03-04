import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { plainToClass } from 'class-transformer'
import { TYPES } from '../ioc'
import {
  ICreateUserCase,
  IFindUsersCase,
} from '../../application/use-cases/users'
import { CreateUserDto } from '../../application/use-cases/users/dtos'

export async function findUsers(req: Request, res: Response): Promise<void> {
  const useCase = container.resolve<IFindUsersCase>(TYPES.FIND_USERS_CASE)
  const result = await useCase.execute()

  res.status(200).json(result)
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreateUserDto, req.body)
  const useCase = container.resolve<ICreateUserCase>(TYPES.CREATE_USER_CASE)

  const result = await useCase.execute(dto)

  res.status(201).json(result)
}