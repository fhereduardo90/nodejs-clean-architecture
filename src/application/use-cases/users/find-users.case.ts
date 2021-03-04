import { IUserRepository } from '../../contracts/repositories/user.repository'
import { UserDto } from './dtos'

export interface IFindUsersCase {
  execute(): Promise<UserDto[]>
}

export class FindUsersCase implements IFindUsersCase {
  constructor(private readonly userRepositoiry: IUserRepository) {}

  execute(): Promise<UserDto[]> {
    return this.userRepositoiry.find()
  }
}
