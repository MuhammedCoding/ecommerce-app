import { CartService } from '../../../../../services/cart.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../../../../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  isCartCountLoading: boolean = true;

  constructor(
    private _tokenService: TokenService,
    private _cartService: CartService
  ) {}
  ngOnDestroy(): void {
    console.log('DESTROYEDD');
  }

  ngOnInit(): void {
    //this.cartItemCount = 0;
    this._tokenService.userData.subscribe({
      next: () => {
        this._cartService.updateCartItemsNum();
        console.log('Yesssss');
      },
    });

    this._cartService.cartItemsLoading.subscribe((loading) => {
      this.isCartCountLoading = loading;
    });

    this._cartService.cartItemsNum.subscribe({
      next: (value) => {
        this.cartItemCount = value;
      },
    });
  }

  logout() {
    this._tokenService.logout();
  }
}
