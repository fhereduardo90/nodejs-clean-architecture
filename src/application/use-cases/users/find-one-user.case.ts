import { IUserRepository } from '../../contracts/repositories/user.repository'
import { UserDto } from './dtos'

export interface IFindOneUserCase {
  execute(id: string): Promise<UserDto>
}

export class FindOneUserCase implements IFindOneUserCase {
  constructor(private readonly userRepositoiry: IUserRepository) {}

  execute(id: string): Promise<UserDto> {
    return this.userRepositoiry.findOne(id)
  }
}
