import { Exclude, Expose, Transform } from 'class-transformer'
import { UserDto } from '../../application/use-cases/users/dtos'

@Exclude()
export class UserSerializer implements Omit<UserDto, 'password'> {
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
