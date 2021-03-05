import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import createError from 'http-errors'
import { IUserRepository } from '../../../../application/contracts/repositories'
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '../../../../application/use-cases/users/dtos'

export class UserRespository implements IUserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  create(params: CreateUserDto): Promise<UserDto> {
    return this.prismaClient.user.create({
      data: {
        id: uuidv4(),
        ...params,
      },
    })
  }

  find(): Promise<UserDto[]> {
    return this.prismaClient.user.findMany()
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prismaClient.user.findUnique({ where: { id } })

    if (!user)
      throw new createError.NotFound(`Couldn't find User with id = '${id}'`)

    return user
  }

  async update(id: string, params: Partial<UpdateUserDto>): Promise<UserDto> {
    try {
      const user = await this.prismaClient.user.update({
        where: { id },
        data: params,
      })

      return user
    } catch (error) {
      throw new createError.NotFound(`Couldn't find User with id = '${id}'`)
    }
  }

  async delete(id: string): Promise<UserDto> {
    try {
      const user = await this.prismaClient.user.delete({
        where: { id },
      })

      return user
    } catch (error) {
      throw new createError.NotFound(`Couldn't find User with id = '${id}'`)
    }
  }
}
