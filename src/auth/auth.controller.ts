import { Controller, Request, Post, UseGuards, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Body, Patch } from '@nestjs/common/decorators';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserRequestDto } from '../users/dto/create-user-request.dto';
import { LoginResponseDto } from '../users/dto/login-response.dto';
import { LoginRequestDto } from '../users/dto/login-request.dto';
import { UserToken } from './interfaces/user-token.interface';
import { ChangeUserPasswordRequestDto } from '../users/dto/change-user-password-request.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserResponseDto } from '../users/dto/user-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/create-account')
  @ApiBody({ type: CreateUserRequestDto })
  @ApiCreatedResponse({ type: UserResponseDto })
  async createAccount(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.authService.createAccount(createUserRequestDto);
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

  @Patch('/change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ChangeUserPasswordRequestDto })
  @ApiCreatedResponse({ type: UserResponseDto })
  async changePassword(
    @Request() { user }: { user: UserToken },
    @Body() changeUserPasswordRequestDto: ChangeUserPasswordRequestDto,
  ): Promise<UserResponseDto> {
    return this.authService.changePassword(changeUserPasswordRequestDto, user);
  }

  @Delete('/delete-account')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({ type: UserResponseDto })
  async deleteAccount(
    @Request() { user }: { user: UserToken },
  ): Promise<UserResponseDto> {
    return this.authService.deleteAccount(user.id);
  }
}
