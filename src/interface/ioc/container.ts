import { PrismaClient } from '@prisma/client'

import {
  container,
  DependencyContainer,
  instanceCachingFactory,
} from 'tsyringe'

// REPOSITORIES
import { IUserRepository } from '../../application/contracts/repositories'
// import { UserRespository } from '../../infrastructure/persistance/memory/repositories'
import { UserRespository } from '../../infrastructure/persistance/prisma/repositories/user.repository'

import {
  CreateUserCase,
  DeleteUserCase,
  FindOneUserCase,
  FindUsersCase,
  UpdateUserCase,
  ICreateUserCase,
  IDeleteUserCase,
  IFindOneUserCase,
  IFindUsersCase,
  IUpdateUserCase,
} from '../../application/use-cases/users'
import { TYPES } from './types'

export function IOCContainerInit(): DependencyContainer {
  // PRISMA
  container.register<PrismaClient>(TYPES.PRISMA_CONNECTION, {
    useFactory: instanceCachingFactory<PrismaClient>(() => new PrismaClient()),
  })
  // REPOSITORIES

  // MEMORY
  // container.registerSingleton<IUserRepository>(
  //   TYPES.USER_REPOSITORY,
  //   UserRespository,
  // )

  // PRISMA
  container.register<IUserRepository>(TYPES.USER_REPOSITORY, {
    useFactory: instanceCachingFactory<IUserRepository>(
      (d) =>
        new UserRespository(d.resolve<PrismaClient>(TYPES.PRISMA_CONNECTION)),
    ),
  })

  // USE CASES
  container.register<ICreateUserCase>(TYPES.CREATE_USER_CASE, {
    useFactory: instanceCachingFactory<ICreateUserCase>(
      (d) =>
        new CreateUserCase(d.resolve<IUserRepository>(TYPES.USER_REPOSITORY)),
    ),
  })
  container.register<IUpdateUserCase>(TYPES.UPDATE_USER_CASE, {
    useFactory: instanceCachingFactory<IUpdateUserCase>(
      (d) =>
        new UpdateUserCase(d.resolve<IUserRepository>(TYPES.USER_REPOSITORY)),
    ),
  })
  container.register<IFindUsersCase>(TYPES.FIND_USERS_CASE, {
    useFactory: instanceCachingFactory<IFindUsersCase>(
      (d) =>
        new FindUsersCase(d.resolve<IUserRepository>(TYPES.USER_REPOSITORY)),
    ),
  })
  container.register<IFindOneUserCase>(TYPES.FIND_ONE_USER_CASE, {
    useFactory: instanceCachingFactory<IFindOneUserCase>(
      (d) =>
        new FindOneUserCase(d.resolve<IUserRepository>(TYPES.USER_REPOSITORY)),
    ),
  })
  container.register<IDeleteUserCase>(TYPES.DELETE_USER_CASE, {
    useFactory: instanceCachingFactory<IDeleteUserCase>(
      (d) =>
        new DeleteUserCase(d.resolve<IUserRepository>(TYPES.USER_REPOSITORY)),
    ),
  })

  return container
}
