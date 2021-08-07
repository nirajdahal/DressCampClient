import { Component, OnInit } from '@angular/core';
import { AccountService } from './feature/account/account.service';
import { BasketService } from './feature/basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private _accountService: AccountService, private basketService: BasketService) {
 
    
  }
  ngOnInit(): void {


    if(this._accountService.isUserAuthenticated()){
      console.log("i am in")
        this._accountService.sendAuthStateChangeNotification(true);
    }
    this.loadBasket();
  
  }

  
  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialised basket');
      }, error => {
        console.log(error);
      })
    }
  }
  
}
