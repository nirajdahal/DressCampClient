import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/products/product';
import { BasketService } from '../../basket/basket.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor
    (
      private _shopService: ShopService,
      private activatedRoute: ActivatedRoute,
      private _basketService: BasketService
    ) { }


  idForProduct!: number;
  product!: IProduct;

  pictureToShow: string = "";

  ngOnInit(): void {
    var id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.idForProduct = +id;
    }

    console.log(id)

    this.loadProduct();

  }

  changePicture(picture: string) {

    this.pictureToShow = picture;
  }

  loadProduct() {
    this._shopService.getProduct(this.idForProduct).subscribe(res => {
      this.product = res;
      console.log(this.product);
      this.pictureToShow = this.product.picture[0].pictureUrl;

    });

  }
  quantity = 1;
  onIncrement() {
    this.quantity = this.quantity + 1;
  }

  onDecrement() {
    if (this.quantity !== 1) {
      this.quantity = this.quantity - 1;
    }

  }

  addItemToCart() {
    console.log("button clicked")
    this._basketService.addItemToBasket(this.product, this.quantity);
  }



}
