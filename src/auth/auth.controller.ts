import { Controller, Request, Post, UseGuards, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Body } from '@nestjs/common/decorators';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginResponseDto } from '../users/dto/login-response.dto';
import { LoginRequestDto } from 'src/users/dto/login-request.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserToken } from './interfaces/user-token.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/create-account')
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: UserEntity })
  async createAccount(@Body() data: CreateUserDto): Promise<UserEntity> {
    return this.authService.createAccount(data);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestDto })
  @ApiCreatedResponse({ type: LoginResponseDto })
  async login(
    @Request() { user }: { user: UserToken },
  ): Promise<LoginResponseDto> {
    return this.authService.login(user);
  }

  @Delete('/delete-account')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({ type: UserEntity })
  async deleteAccount(
    @Request() { user }: { user: UserToken },
  ): Promise<UserEntity> {
    return this.authService.deleteAccount(user.id);
  }
}
