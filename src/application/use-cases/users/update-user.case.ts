import { IUserRepository } from '../../contracts/repositories/user.repository'
import { UpdateUserDto, UserDto } from './dtos'

export interface IUpdateUserCase {
  execute(id: string, params: UpdateUserDto): Promise<UserDto>
}

export class UpdateUserCase implements IUpdateUserCase {
  constructor(private readonly userRepositoiry: IUserRepository) {}

  execute(id: string, params: UpdateUserDto): Promise<UserDto> {
    return this.userRepositoiry.update(id, params)
  }
}
