import { Expose, Exclude } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { User } from '../../../../domain/user'
import { BaseDto } from '../../../contracts/dto/base.dto'

@Exclude()
export class CreateUserDto
  extends BaseDto
  implements Omit<User, 'id' | 'createdAt'> {
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string

  @Expose()
  @IsEmail()
  readonly email: string

  @Expose()
  @IsString()
  @Length(6, 20)
  readonly password: string
}
