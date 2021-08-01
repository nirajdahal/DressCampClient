import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products/product';
import { IBrand } from 'src/app/shared/models/products/productBrand';
import { IProductParam } from 'src/app/shared/models/products/productparam';
import { IType } from 'src/app/shared/models/products/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[] = [];
  brands: IBrand[] = [];
  productTypes: IType[] = [];
  selectedBrandId: number = 0;
  selectedTypeId: number = 0;
  selectedSortValue: string = '';
  selectedSearchValue: any = '';
  currentPage = 1;
  totalItem = 0;
  itemPerPage = 5;
  productBrands: IBrand[] = [];
  
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProductBrand();
    this.getProductType();
    this.getProducts();
  }


  getProductBrand(){
    this.shopService.getBrands().subscribe(b => {
        this.productBrands = b;
    })
  }
  getProductType(){
    this.shopService.getProductTypes().subscribe(t => {
      this.productTypes= t;
    })
  }

  getProducts() {
    var productParam: IProductParam = {
      sort: this.selectedSortValue,
      search: this.selectedSearchValue,
      brandId: this.selectedBrandId,
      typeId: this.selectedTypeId,
      pageIndex: this.currentPage,
      pageSize: this.itemPerPage
    };
    this.shopService.getProducts(productParam).subscribe(p => {

      if(p !==null){
        this.products = p.data;
        console.log(this.products);
        this.totalItem = p.count;
      }

    }, error => {
      console.log(error);
    })
  }


  onBrandSelected(id : number){
    this.selectedBrandId = id;
    this.getProducts();
  }

  onTypeSelected(id : number){
    this.selectedTypeId = id;
    this.getProducts();
  }
  
  onSortSelected(val:any) {

  
      this.selectedSortValue = val.value
    console.log(this.selectedSortValue)
    
    this.getProducts();
  }

  
  applySearch() {

    this.getProducts();

  }


  clearFilter() {

    this.selectedBrandId = 0;
    this.selectedTypeId = 0;
    this.selectedSortValue = "name";
    this.selectedSearchValue = "";
    this.currentPage = 1;
    this.getProducts();

  }

}
