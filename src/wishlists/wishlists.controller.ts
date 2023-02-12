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
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WishlistEntity } from './entities/wishlist.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { WishlistsPartakersService } from './wishlists-partakers.service';
import { UserToken } from 'src/auth/interfaces/user-token.interface';

@Controller('wishlists')
@ApiTags('wishlists')
@UseGuards(JwtAuthGuard)
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly wishlistsPartakersService: WishlistsPartakersService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: WishlistEntity })
  create(
    @Request() { user }: { user: UserToken },
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    return this.wishlistsService.create(createWishlistDto, user.id);
  }

  @Get()
  @ApiOkResponse({ type: WishlistEntity, isArray: true })
  findOwnedAndPartakings(@Request() { user }: { user: UserToken }) {
    return this.wishlistsService.findOwnedAndPartakings(user.id);
  }

  @Get('owned')
  @ApiOkResponse({ type: WishlistEntity, isArray: true })
  findOwned(@Request() { user }: { user: UserToken }) {
    return this.wishlistsService.findOwned(user.id);
  }

  @Get('partakings')
  @ApiOkResponse({ type: WishlistEntity, isArray: true })
  findPartakings(@Request() { user }: { user: UserToken }) {
    return this.wishlistsPartakersService.findWishlistsByUserId(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: WishlistEntity })
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne({ id: +id });
  }

  @Patch(':id')
  @ApiOkResponse({ type: WishlistEntity })
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.update(+id, updateWishlistDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WishlistEntity })
  delete(@Param('id') id: string) {
    return this.wishlistsService.delete(+id);
  }

  @Get(':id/partakers')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findPartakers(@Param('id') id: string) {
    return this.wishlistsPartakersService.findPartakersByWishlistId(+id);
  }
}
