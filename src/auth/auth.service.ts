import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginResponseDto } from '../users/dto/login-response.dto';
import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserToken } from './interfaces/user-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserToken): Promise<LoginResponseDto> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createAccount(userCreateInput: CreateUserDto): Promise<UserEntity> {
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

  async deleteAccount(userId: number): Promise<UserEntity> {
    const { id, email, username } = await this.usersService.deleteOne(userId);
    return { id, email, username };
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      const { id, username, email } = user;
      return { id, username, email };
    }
    return null;
  }
}
