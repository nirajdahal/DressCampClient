import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {IBrand} from 'src/app/shared/models/products/productBrand';
import {IType} from 'src/app/shared/models/products/productType';
import { IProductParam } from 'src/app/shared/models/products/productparam';
import { IPagination } from 'src/app/shared/models/products/pagination';
import { IProduct } from 'src/app/shared/models/products/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl =  environment.apiUrl; 
  constructor(private http: HttpClient) { }

  getProducts(productParam: IProductParam) {
    let params = new HttpParams();

    if (productParam.brandId) {
      params = params.append('brandId', productParam.brandId.toString())
    }
    if (productParam.typeId) {
      params = params.append('typeId', productParam.typeId.toString())
    }
    if (productParam.sort) {
      params = params.append('sort', productParam.sort.toString())
    }
    if (productParam.search) {
      params = params.append('search', productParam.search.toString())
    }

    params = params.append('pageIndex', productParam.pageIndex.toString())
    params = params.append('pageSize', productParam.pageSize.toString());
    return this.http.get<IPagination<IProduct>>(this.baseUrl + "products", { observe: 'response', params }).
      pipe(
        map(res => {
          return res.body;
        }))
      ;
  }
  getProduct(id:number) {
    return this.http.get<IProduct>(this.baseUrl + "products/" + id);
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + "products/brands");
  }

  // getErrors() {
  //   return this.http.get(this.baseUrl + "buggy/badrequest/5");
  // }

  getProductTypes() {
    return this.http.get<IType[]>(this.baseUrl + "products/types");
  }



}
