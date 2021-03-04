import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '../../use-cases/users/dtos'

export interface IUserRepository {
  find(): Promise<UserDto[]>
  findOne(id: string): Promise<UserDto>
  create(params: CreateUserDto): Promise<UserDto>
  update(id: string, params: Partial<UpdateUserDto>): Promise<UserDto>
  delete(id: string): Promise<UserDto>
}
