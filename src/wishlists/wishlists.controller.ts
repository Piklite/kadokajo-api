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
import { UserToken } from 'src/auth/interfaces/user-token.interface';

@Controller('wishlists')
@ApiTags('wishlists')
@UseGuards(JwtAuthGuard)
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

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
    return this.wishlistsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: WishlistEntity })
  findOne(@Request() { user }: { user: UserToken }, @Param('id') id: string) {
    return this.wishlistsService.findOne(+id, user.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: WishlistEntity })
  update(
    @Request() { user }: { user: UserToken },
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.update(+id, updateWishlistDto, user.id);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WishlistEntity })
  delete(@Request() { user }: { user: UserToken }, @Param('id') id: string) {
    return this.wishlistsService.delete(+id, user.id);
  }
}
