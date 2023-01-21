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
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { LoginRequestDto } from 'src/users/dto/login-request.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/create-account')
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserResponseDto,
  })
  async createAccount(@Body() data: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.createAccount(data);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestDto })
  @ApiCreatedResponse({
    description: 'The user has been successfully authenticated.',
    type: LoginResponseDto,
  })
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Delete('/delete-account')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({
    description: 'The user has been successfully deleted.',
    type: UserResponseDto,
  })
  async deleteAccount(@Request() req): Promise<UserResponseDto> {
    return this.authService.deleteAccount(req.user);
  }
}
