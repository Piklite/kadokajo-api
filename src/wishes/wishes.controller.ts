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
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { WishEntity } from './entities/wish.entity';
import { UserToken } from 'src/auth/interfaces/user-token.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
    @Body() createWishDto: CreateWishDto,
  ): Promise<WishEntity> {
    return this.wishesService.create(createWishDto, +wishlistId, user.id);
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
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<WishEntity> {
    return this.wishesService.update(+id, updateWishDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WishEntity })
  remove(@Param('id') id: string): Promise<WishEntity> {
    return this.wishesService.remove(+id);
  }
}
