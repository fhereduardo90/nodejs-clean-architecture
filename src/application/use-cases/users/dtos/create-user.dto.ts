import { User } from '../../../../domain/user'

export class CreateUserDto implements Omit<User, 'id' | 'createdAt'> {
  constructor(
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
