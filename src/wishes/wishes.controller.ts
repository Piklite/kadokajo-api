import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishRequestDto } from './dto/create-wish-request.dto';
import { UpdateWishRequestDto } from './dto/update-wish-request.dto';
import { WishEntity } from './entities/wish.entity';
import { UserToken } from '../auth/interfaces/user-token.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
// import { UserIsPartakerInWishlistGuard } from 'src/wishlists/guards/user-is-partaker-in-wishlist.guard';
import { UserIsCreatorOfWishGuard } from './guards/user-is-creator-of-wish/user-is-creator-of-wish.guard';

@Controller('wishlists/:wishlistId/wishes')
@ApiTags('wishes')
@UseGuards(JwtAuthGuard)
// @UseGuards(UserIsPartakerInWishlistGuard)
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @ApiCreatedResponse({ type: WishEntity })
  create(
    @Request() { user }: { user: UserToken },
    @Param('wishlistId') wishlistId: string,
    @Body() createWishRequestDto: CreateWishRequestDto,
  ): Promise<WishEntity> {
    return this.wishesService.create(
      createWishRequestDto,
      +wishlistId,
      user.id,
    );
  }

  @Get()
  @ApiOkResponse({ type: WishEntity, isArray: true })
  findAll(@Param('wishlistId') wishlistId: string): Promise<WishEntity[]> {
    return this.wishesService.findAll(+wishlistId);
  }

  @Get(':wishId')
  @ApiOkResponse({ type: WishEntity })
  findOne(@Param('wishId') wishId: string): Promise<WishEntity> {
    return this.wishesService.findOne(+wishId);
  }

  @Patch(':wishId')
  @UseGuards(UserIsCreatorOfWishGuard)
  @ApiOkResponse({ type: WishEntity })
  update(
    @Param('wishId') wishId: string,
    @Body() updateWishRequestDto: UpdateWishRequestDto,
  ): Promise<WishEntity> {
    return this.wishesService.update(+wishId, updateWishRequestDto);
  }

  @Delete(':wishId')
  @UseGuards(UserIsCreatorOfWishGuard)
  @ApiOkResponse({ type: WishEntity })
  remove(@Param('wishId') wishId: string): Promise<WishEntity> {
    return this.wishesService.remove(+wishId);
  }
}
