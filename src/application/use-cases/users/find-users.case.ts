import { IUserRepository } from '../../contracts/repositories/user.repository'
import { UserDto } from './dtos'

export interface IFindUserCase {
  execute(): Promise<UserDto[]>
}

export class FindUserCase implements IFindUserCase {
  constructor(private readonly userRepositoiry: IUserRepository) {}

  execute(): Promise<UserDto[]> {
    return this.userRepositoiry.find()
  }
}
