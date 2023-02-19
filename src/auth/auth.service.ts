import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginResponseDto } from '../users/dto/login-response.dto';
import { CreateUserRequestDto } from '../users/dto/create-user-request.dto';
import { UserToken } from './interfaces/user-token.interface';
import { ChangeUserPasswordRequestDto } from '../users/dto/change-user-password-request.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

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

  async changePassword(
    changeUserPasswordRequestDto: ChangeUserPasswordRequestDto,
    userToken: UserToken,
  ): Promise<UserResponseDto> {
    if (changeUserPasswordRequestDto.email !== userToken.email) {
      throw new UnauthorizedException('Invalid email');
    }
    const user = await this.validateUser(
      userToken.email,
      changeUserPasswordRequestDto.previousPassword,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid previous password');
    }
    const hashedPassword = await this._encryptPassword(
      changeUserPasswordRequestDto.newPassword,
    );
    return this.usersService.update(userToken.id, {
      password: hashedPassword,
    });
  }

  async createAccount(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const hashedPassword = await this._encryptPassword(
      createUserRequestDto.password,
    );
    const data = {
      email: createUserRequestDto.email,
      username: createUserRequestDto.username,
      password: hashedPassword,
    };
    const { id, email, username } = await this.usersService.create(data);
    return { id, email, username };
  }

  async deleteAccount(userId: number): Promise<UserResponseDto> {
    const { id, email, username } = await this.usersService.delete(userId);
    return { id, email, username };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      const { id, username, email } = user;
      return { id, username, email };
    }
    return null;
  }

  private async _encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
