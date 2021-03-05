import { v4 as uuidv4 } from 'uuid'
import createError from 'http-errors'
import { IUserRepository } from '../../../../application/contracts/repositories'
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '../../../../application/use-cases/users/dtos'
import { UserEntity } from '../entities/user.entity'

const userDB: UserEntity[] = []

export class UserRespository implements IUserRepository {
  create(params: CreateUserDto): Promise<UserDto> {
    const user = new UserEntity(
      uuidv4(),
      params.firstName,
      params.lastName,
      params.email,
      params.password,
      new Date(),
    )
    user.uuid = uuidv4() // this field does not belong to user domain
    userDB.push(user)

    // eslint-disable-next-line no-console
    console.table(userDB)
    return Promise.resolve(user)
  }

  find(): Promise<UserDto[]> {
    return Promise.resolve(userDB)
  }

  findOne(id: string): Promise<UserDto> {
    const user = userDB.find((u) => u.id === id)

    if (!user)
      throw new createError.NotFound(`Couldn't find User with id = '${id}'`)

    return Promise.resolve(user)
  }

  update(id: string, params: Partial<UpdateUserDto>): Promise<UserDto> {
    const index = userDB.findIndex((u) => u.id === id)

    if (index === -1) {
      throw new createError.NotFound(`Couldn't find User with id = '${id}'`)
    }

    userDB[index] = { ...userDB[index], ...params }

    return Promise.resolve(userDB[index])
  }

  delete(id: string): Promise<UserDto> {
    const index = userDB.findIndex((u) => u.id === id)

    if (index === -1) {
      throw new createError.NotFound(`Couldn't find User with id = '${id}'`)
    }

    const user = userDB.splice(index, 1)[0]

    return Promise.resolve(user)
  }
}
