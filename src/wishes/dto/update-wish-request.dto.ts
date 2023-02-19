import { PartialType } from '@nestjs/swagger';
import { CreateWishRequestDto } from './create-wish-request.dto';

export class UpdateWishRequestDto extends PartialType(CreateWishRequestDto) {}
