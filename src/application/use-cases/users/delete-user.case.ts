import { IUserRepository } from '../../contracts/repositories/user.repository'
import { UserDto } from './dtos'

export interface IDeleteUserCase {
  execute(id: number): Promise<UserDto>
}

export class DeleteUserCase implements IDeleteUserCase {
  constructor(private readonly userRepositoiry: IUserRepository) {}

  execute(id: number): Promise<UserDto> {
    return this.userRepositoiry.delete(id)
  }
}
