import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput): Promise<UserEntity> {
    return this.prisma.user.create({ data });
  }

  findOne(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(
    id: number,
    updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<UserEntity> {
    return this.prisma.user.update({
      data: { ...updateUserRequestDto },
      where: { id },
    });
  }

  delete(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({ where: { id } });
  }
}
