import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WishesService } from '../../wishes.service';

@Injectable()
export class UserIsCreatorOfWishGuard implements CanActivate {
  constructor(private readonly wishesService: WishesService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const wishId = request.params.wishId;
    const userId = request.user.id;
    return this.wishesService.validateUserIsCreatorOfWish(+wishId, +userId);
  }
}
