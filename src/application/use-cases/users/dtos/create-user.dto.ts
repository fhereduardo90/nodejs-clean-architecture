import { User } from 'src/domain/user'

export class CreateUserDto implements Omit<User, 'id' | 'createdAt'> {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
