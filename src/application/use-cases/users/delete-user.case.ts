import { IUserRepository } from '../../contracts/repositories/user.repository'
import { UserDto } from './dtos'

export interface IDeleteUserCase {
  execute(id: string): Promise<UserDto>
}

export class DeleteUserCase implements IDeleteUserCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(id: string): Promise<UserDto> {
    return this.userRepository.delete(id)
  }
}
