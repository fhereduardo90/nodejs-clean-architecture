import { Expose, Exclude, Transform } from 'class-transformer'
import { User } from '../../../../domain/user'

@Exclude()
export class UserDto implements Omit<User, 'password' | 'createdAt'> {
  @Expose()
  readonly id: string

  @Expose()
  readonly firstName: string

  @Expose()
  readonly lastName: string

  @Expose()
  readonly email: string

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  readonly createdAt: Date
}
