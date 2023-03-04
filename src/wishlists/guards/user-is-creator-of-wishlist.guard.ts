import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WishlistsService } from '../wishlists.service';

@Injectable()
export class UserIsCreatorOfWishlistGuard implements CanActivate {
  constructor(private readonly wishlistsService: WishlistsService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const wishlistId = request.params.wishlistId;
    const userId = request.user.id;
    return this.wishlistsService.validateUserIsCreatorOfWishlist(
      +wishlistId,
      +userId,
    );
  }
}
