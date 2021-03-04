import { User } from '../../../../domain/user'

export class UserDto implements Omit<User, 'password' | 'createdAt'> {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public createdAt: string,
  ) {}
}
