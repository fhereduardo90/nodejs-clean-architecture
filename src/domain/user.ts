export class User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public createdAt: Date,
  ) {}
}
