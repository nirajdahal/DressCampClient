import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from 'src/app/feature/basket/basket.service';
import { IBasketItem } from '../../models/baskets/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  constructor(private basketService : BasketService) { }

  @Input() items! : IBasketItem[] ;
  @Output() decreaseQuantity:EventEmitter<IBasketItem>= new EventEmitter();  
  @Output() increaseQuantity:EventEmitter<IBasketItem>= new EventEmitter();  
  @Output() basketToDeleteId:EventEmitter<IBasketItem>= new EventEmitter();
  @Input() showButtons: boolean = true;
  ngOnInit(): void {
    
  
   
  }
  decrease(item:any){
    this.decreaseQuantity.emit(item);
  }
  increase(item:any){
    this.increaseQuantity.emit(item);
  }
  delete(item:IBasketItem){
   
    this.basketToDeleteId.emit(item);
  }


}
