import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/orders/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order!: IOrder;

  constructor(private route: ActivatedRoute,
    private orderService: OrderService) {

  }

  ngOnInit(): void {
    
    this.orderService.getOrderDetailed(+this.route.snapshot.paramMap.get('id')!)
      .subscribe((order: IOrder) => {
        this.order = order;
        console.log("order", this.order)
      }, error => {
        console.log(error);
      })
  }

 

}
