import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Prisma, User } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ email });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) throw new NotAcceptableException('Could not find the user');
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createAccount(userCreateInput: Prisma.UserCreateInput): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      userCreateInput.password,
      saltOrRounds,
    );
    return await this.usersService.createOne({
      ...userCreateInput,
      password: hashedPassword,
    });
  }

  async deleteAccount(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Incorrect email or password');
    return this.usersService.deleteOne({ email });
  }
}
