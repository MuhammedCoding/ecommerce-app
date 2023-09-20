import { Component, Input, OnChanges } from '@angular/core';
import { Product } from '../../../../../interfaces/product';
import { CartService } from '../../../../../services/cart.service';
import { WishlistService } from '../../../../../services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../../../../animations/animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],
})
export class ProductCardComponent implements OnChanges {
  @Input() product!: Product;
  @Input() wishlistIds: string[] | null = null;
  isInWishlist: boolean = false;
  isAddLoading: boolean = false;

  constructor(
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private toastr: ToastrService
  ) {}

  ngOnChanges() {
    if (this.wishlistIds !== null) {
      this.isInWishlist = this.wishlistIds.includes(this.product.id);
    }
  }

  addToCart(productId: string) {
    this.isAddLoading = true;
    this._cartService.addToCart(productId).subscribe({
      next: (response) => {
        this._cartService.cartItemsNum.next(response.numOfCartItems);
        this.isAddLoading = false;
        this.toastr.success('Product added to cart successfully!', 'Success', {
          timeOut: 2500,
        });
      },
      error: (err) => {
        this.isAddLoading = false;
        this.toastr.error('Sorry! something went wrong', 'Major Error', {});
      },
    });
  }

  addToWishList(productId: string) {
    this._wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        this.toastr.success(
          'Product added to your wishlist successfully!',
          'Success',
          {
            timeOut: 2500,
          }
        );
      },
      error: () => {
        this.toastr.error('Sorry! something went wrong', 'Major Error', {});
      },
    });
  }

  removeFromWishlist(productId: string) {
    this._wishlistService.deleteProductFromWishlist(productId).subscribe({
      next: () => {
        this.toastr.success(
          'Product removed from your wishlist successfully!',
          'Success',
          {
            timeOut: 2500,
          }
        );
      },
      error: () => {
        this.toastr.error('Sorry! something went wrong', 'Major Error', {});
      },
    });
  }

  toggleWishlist(productId: string) {
    this.isInWishlist
      ? this.removeFromWishlist(productId)
      : this.addToWishList(productId);
    this.isInWishlist = !this.isInWishlist;
  }
}
