import { IUserRepository } from '../../contracts/repositories/user.repository'
import { CreateUserDto, UserDto } from './dtos'

export interface ICreateUserCase {
  execute(params: CreateUserDto): Promise<UserDto>
}

export class CreateUserCase implements ICreateUserCase {
  constructor(private readonly userRepositoiry: IUserRepository) {}

  execute(params: CreateUserDto): Promise<UserDto> {
    return this.userRepositoiry.create(params)
  }
}
