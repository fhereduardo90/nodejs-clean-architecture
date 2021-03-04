import { IUserRepository } from '../../contracts/repositories/user.repository'
import { UserDto } from './dtos'

export interface IFindUsersCase {
  execute(): Promise<UserDto[]>
}

export class FindUsersCase implements IFindUsersCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(): Promise<UserDto[]> {
    return this.userRepository.find()
  }
}
