import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistRequestDto } from './dto/create-wishlist-request.dto';
import { UpdateWishlistRequestDto } from './dto/update-wishlist-request.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserToken } from '../auth/interfaces/user-token.interface';
import { AddPartakerToWishlistRequestDto } from './dto/add-partaker-to-wishlist-request.dto';
import { UserIsPartakerInWishlistGuard } from './guards/user-is-partaker-in-wishlist.guard';
import { UserIsCreatorOfWishlistGuard } from './guards/user-is-creator-of-wishlist.guard';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { WishlistDto } from './dto/wishlist.dto';
import { UserOnWishlistEntity } from './entities/user-on-wishlist.entity';

@Controller('wishlists')
@ApiTags('wishlists')
@UseGuards(JwtAuthGuard)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @ApiCreatedResponse({ type: WishlistDto })
  create(
    @Request() { user }: { user: UserToken },
    @Body() createWishlistRequestDto: CreateWishlistRequestDto,
  ): Promise<WishlistDto> {
    return this.wishlistsService.create(createWishlistRequestDto, user.id);
  }

  @Get()
  @ApiOkResponse({ type: WishlistDto, isArray: true })
  findOwnedAndPartakings(
    @Request() { user }: { user: UserToken },
  ): Promise<WishlistDto[]> {
    return this.wishlistsService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(UserIsPartakerInWishlistGuard)
  @ApiOkResponse({ type: WishlistDto })
  findOne(@Param('id') id: string): Promise<WishlistDto> {
    return this.wishlistsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(UserIsCreatorOfWishlistGuard)
  @ApiOkResponse({ type: WishlistDto })
  update(
    @Param('id') id: string,
    @Body() updateWishlistRequestDto: UpdateWishlistRequestDto,
  ): Promise<WishlistDto> {
    return this.wishlistsService.update(+id, updateWishlistRequestDto);
  }

  @Delete(':id')
  @UseGuards(UserIsCreatorOfWishlistGuard)
  @ApiOkResponse({ type: WishlistDto })
  delete(@Param('id') id: string): Promise<WishlistDto> {
    return this.wishlistsService.remove(+id);
  }

  @Get(':id/partakers')
  @UseGuards(UserIsPartakerInWishlistGuard)
  @ApiOkResponse({ type: UserOnWishlistEntity, isArray: true })
  getPartakers(@Param('id') id: string): Promise<UserOnWishlistEntity[]> {
    return this.wishlistsService.getPartakers(+id);
  }

  @Post(':id/partakers')
  @UseGuards(UserIsCreatorOfWishlistGuard)
  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  addPartaker(
    @Param('id') id: string,
    @Body() addUserToWishlistDto: AddPartakerToWishlistRequestDto,
  ): Promise<WishlistDto> {
    return this.wishlistsService.addPartaker(+id, addUserToWishlistDto);
  }
}
