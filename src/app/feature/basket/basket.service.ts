import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Basket, IBasket, IBasketItem, IBasketTotal } from 'src/app/shared/models/baskets/basket';
import { IProduct } from 'src/app/shared/models/products/product';
import { environment } from 'src/environments/environment';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;

  public basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotal | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  constructor(private httpClinet: HttpClient, private _userService: AccountService) { }


  getBasket() {
    return this.httpClinet.get(this.baseUrl + "basket").pipe(

      map((basket: IBasket | any) => {
        localStorage.setItem("basket_id", basket.id)
        this.basketSource.next(basket);
        
        this.calculateTotal();
      })
    )
  }

  setBasket(basket: IBasket) {
    return this.httpClinet.post<IBasket>(this.baseUrl + "basket", basket).subscribe((res: IBasket) => {

      this.basketSource.next(res);
      this.calculateTotal();
    }, err => {
      console.log(err);
    })
  }
  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue();
    if(basket !==null){
      basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity)
    console.log("basket", basket);
    this.setBasket(basket);
    }
    
  }
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {

    const index = items.findIndex(i => i.id == itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.picture[0].pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private calculateTotal() {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    if (basket !== null) {
      const subtotal = basket.items.reduce(
        (a, b) => (b.price * b.quantity) + a, 0
      )
      const total = subtotal + shipping;
      this.basketTotalSource.next({ shipping, total, subtotal })
    }


  }


  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket !== null){
      const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
      basket.items[foundItemIndex].quantity++;
      this.setBasket(basket);
    }

  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket !== null){
      const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
      if (basket.items[foundItemIndex].quantity > 1) {
        basket.items[foundItemIndex].quantity--;
        this.setBasket(basket);
      } else {
        this.removeItemFromBasket(item);
      }
    }

  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket !== null) {
      if (basket.items.some(x => x.id === item.id)) {
        basket.items = basket.items.filter(i => i.id !== item.id);
        if (basket.items.length > 0) {
          this.setBasket(basket);
        } else {
          this.deleteBasket(basket.id);
        }
      }
    }

  }
  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basketId: string) {
    return this.httpClinet.delete(this.baseUrl + 'basket?id=' + basketId).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    })
  }
}
