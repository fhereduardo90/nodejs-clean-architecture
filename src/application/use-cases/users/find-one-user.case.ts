import { IUserRepository } from '../../contracts/repositories/user.repository'
import { UserDto } from './dtos'

export interface IFindOneUserCase {
  execute(id: number): Promise<UserDto>
}

export class FindOneUserCase implements IFindOneUserCase {
  constructor(private readonly userRepositoiry: IUserRepository) {}

  execute(id: number): Promise<UserDto> {
    return this.userRepositoiry.findOne(id)
  }
}
