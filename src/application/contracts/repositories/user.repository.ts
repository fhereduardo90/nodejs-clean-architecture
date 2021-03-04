import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '../../use-cases/users/dtos'

export interface IUserRepository {
  find(): Promise<UserDto[]>
  findOne(id: number): Promise<UserDto>
  create(paranms: CreateUserDto): Promise<UserDto>
  update(id: number, params: Partial<UpdateUserDto>): Promise<UserDto>
  delete(id: number): Promise<UserDto>
}
