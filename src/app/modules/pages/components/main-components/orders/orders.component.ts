import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../../services/order.service';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../../../../animations/animations';
import { TokenService } from 'src/app/services/token.service';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],
})
export class OrdersComponent implements OnInit {
  constructor(
    private _orderService: OrderService,
    private _tokenService: TokenService
  ) {}
  isLoading: boolean = true;
  allOrders: Order[] = [];
  userId: any = this._tokenService.getUserId();
  ngOnInit(): void {
    console.log(this.userId);

    this._orderService.getUserOrders(this.userId).subscribe({
      next: (response) => {
        this.allOrders = response;
        console.log(this.allOrders);
        this.isLoading = false;
      },
    });
  }
}
