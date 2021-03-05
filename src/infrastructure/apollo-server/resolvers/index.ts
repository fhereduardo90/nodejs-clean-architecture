import { plainToClass } from 'class-transformer'
import { DependencyContainer } from 'tsyringe'
import {
  ICreateUserCase,
  IFindUsersCase,
} from '../../../application/use-cases/users'
import {
  CreateUserDto,
  UserDto,
} from '../../../application/use-cases/users/dtos'
import { TYPES } from '../../../interface/ioc'

type CreateUserType = {
  user: Partial<CreateUserDto>
}

type ContextType = {
  IOCContainer: DependencyContainer
}

export const resolvers = {
  Query: {
    async users(
      _: unknown,
      __: unknown,
      { IOCContainer }: ContextType,
    ): Promise<UserDto[]> {
      const useCase = IOCContainer.resolve<IFindUsersCase>(
        TYPES.FIND_USERS_CASE,
      )
      const result = await useCase.execute()

      return result
    },
  },
  Mutation: {
    createUser: async (
      _: unknown,
      args: CreateUserType,
      { IOCContainer }: ContextType,
    ): Promise<UserDto> => {
      const dto = plainToClass(CreateUserDto, args.user)
      const useCase = IOCContainer.resolve<ICreateUserCase>(
        TYPES.CREATE_USER_CASE,
      )
      const result = await useCase.execute(dto)

      return result
    },
  },
}