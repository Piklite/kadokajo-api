import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WishlistsService } from '../wishlists.service';

@Injectable()
export class UserIsPartakerInWishlistGuard implements CanActivate {
  constructor(private readonly wishlistsService: WishlistsService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const wishlistId = request.params.id;
    const userId = request.user.id;
    return this.wishlistsService.validateUserIsPartakerInWishlist(
      +wishlistId,
      +userId,
    );
  }
}
