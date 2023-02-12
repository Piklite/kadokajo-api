import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createOne(data: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({ data });
  }

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateOne(id: number, data: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({ data, where: { id } });
  }

  async deleteOne(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({ where: { id } });
  }
}
