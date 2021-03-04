export class UpdateUserDto {
  constructor(
    readonly firstName?: string,
    readonly lastName?: string,
    readonly email?: string,
    readonly password?: string,
  ) {}
}
