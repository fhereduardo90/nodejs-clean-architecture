import { IUserRepository } from '../../contracts/repositories/user.repository'
import { UserDto } from './dtos'

export interface IFindOneUserCase {
  execute(id: string): Promise<UserDto>
}

export class FindOneUserCase implements IFindOneUserCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(id: string): Promise<UserDto> {
    return this.userRepository.findOne(id)
  }
}
