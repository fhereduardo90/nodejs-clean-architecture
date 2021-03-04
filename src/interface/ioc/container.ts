import { container } from 'tsyringe'

// REPOSITORIES
import { IUserRepository } from '../../application/contracts/repositories'
import { UserRespository } from '../../infrastructure/persistance/memory/repositories'

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

export function IOCContainerInit(): void {
  // REPOSITORIES
  container.register<IUserRepository>(TYPES.USER_REPOSITORY, {
    useFactory: () => new UserRespository(),
  })

  // USE CASES
  container.register<ICreateUserCase>(TYPES.CREATE_USER_CASE, {
    useFactory: (d) =>
      new CreateUserCase(d.resolve<IUserRepository>(TYPES.USER_REPOSITORY)),
  })
  container.register<IUpdateUserCase>(TYPES.UPDATE_USER_CASE, {
    useFactory: (d) =>
      new UpdateUserCase(d.resolve<IUserRepository>(TYPES.USER_REPOSITORY)),
  })
  container.register<IFindUsersCase>(TYPES.FIND_USERS_CASE, {
    useFactory: (d) =>
      new FindUsersCase(d.resolve<IUserRepository>(TYPES.USER_REPOSITORY)),
  })
  container.register<IFindOneUserCase>(TYPES.FIND_ONE_USER_CASE, {
    useFactory: (d) =>
      new FindOneUserCase(d.resolve<IUserRepository>(TYPES.USER_REPOSITORY)),
  })
  container.register<IDeleteUserCase>(TYPES.DELETE_USER_CASE, {
    useFactory: (d) =>
      new DeleteUserCase(d.resolve<IUserRepository>(TYPES.USER_REPOSITORY)),
  })
}
