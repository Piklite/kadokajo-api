import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Prisma, User } from '@prisma/client';
import { LoginResponseDto } from 'src/users/dto/login-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User): Promise<LoginResponseDto> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createAccount(
    userCreateInput: Prisma.UserCreateInput,
  ): Promise<UserResponseDto> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      userCreateInput.password,
      saltOrRounds,
    );
    const { id, email, username } = await this.usersService.createOne({
      ...userCreateInput,
      password: hashedPassword,
    });
    return { id, email, username };
  }

  async deleteAccount(user: User): Promise<UserResponseDto> {
    const { id, email, username } = await this.usersService.deleteOne({
      id: user.id,
    });
    return { id, email, username };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ email });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
}
