import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { plainToClass } from 'class-transformer'
import { TYPES } from '../ioc'
import {
  ICreateUserCase,
  IFindOneUserCase,
  IFindUsersCase,
} from '../../application/use-cases/users'
import { CreateUserDto } from '../../application/use-cases/users/dtos'
import { UserSerializer } from '../serializers/user.serializer'

export async function findUsers(req: Request, res: Response): Promise<void> {
  const useCase = container.resolve<IFindUsersCase>(TYPES.FIND_USERS_CASE)
  const result = await useCase.execute()

  res.status(200).json(plainToClass(UserSerializer, result))
}

export async function findOneUser(req: Request, res: Response): Promise<void> {
  const useCase = container.resolve<IFindOneUserCase>(TYPES.FIND_ONE_USER_CASE)
  const result = await useCase.execute(req.params.id)

  res.status(200).json(plainToClass(UserSerializer, result))
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreateUserDto, req.body)
  const useCase = container.resolve<ICreateUserCase>(TYPES.CREATE_USER_CASE)

  const result = await useCase.execute(dto)

  res.status(201).json(plainToClass(UserSerializer, result))
}
