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

@Controller('wishlists/:wishlistId/wishes')
@ApiTags('wishes')
@UseGuards(JwtAuthGuard)
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

  @Get(':id')
  @ApiOkResponse({ type: WishEntity })
  findOne(@Param('id') id: string): Promise<WishEntity> {
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: WishEntity })
  update(
    @Param('id') id: string,
    @Body() updateWishRequestDto: UpdateWishRequestDto,
  ): Promise<WishEntity> {
    return this.wishesService.update(+id, updateWishRequestDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WishEntity })
  remove(@Param('id') id: string): Promise<WishEntity> {
    return this.wishesService.remove(+id);
  }
}
