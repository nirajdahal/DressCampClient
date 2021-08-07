import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotal } from 'src/app/shared/models/baskets/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$!: Observable<IBasket | null>;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    let currentBasketValue =   this.basketService.basket$;
    this.basket$ = currentBasketValue;
  }

  decreaseItemQuantity($event:any){
    
  this.basketService.decrementItemQuantity($event);
  }
  
  increaseItemQuantity($event:any){
    this.basketService.incrementItemQuantity($event);
  }


}
