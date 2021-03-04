import { IUserRepository } from '../../contracts/repositories/user.repository'
import { CreateUserDto, UserDto } from './dtos'

export interface ICreateUserCase {
  execute(params: CreateUserDto): Promise<UserDto>
}

export class CreateUserCase implements ICreateUserCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: CreateUserDto): Promise<UserDto> {
    await params.isValid()
    return this.userRepository.create(params)
  }
}
