import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/orders/order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders!: IOrder[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrdersForUser().subscribe((orders: IOrder[] ) => {
      this.orders = orders;
      console.log(this.orders)
    }, error => {
      console.log(error);
    })
  }

}
