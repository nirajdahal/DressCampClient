import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDeliveryMethod, IOrderToCreate, IAddress } from 'src/app/shared/models/orders/order';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm!: FormGroup;
  deliveryMethods!: IDeliveryMethod[];
  
  constructor(private checkoutService : CheckoutService) { }

  ngOnInit(): void {

    

    this.checkoutForm = new FormGroup({
      firstName : new FormControl("", [Validators.required]),
      lastName : new FormControl("", [Validators.required]),
      street : new FormControl("", [Validators.required]),
      city : new FormControl("", [Validators.required]),
      deliveryMethod : new FormControl("", [Validators.required])

    })
    this.getDeliveryMethod()
    
  }
  public validateControl = (controlName: string) => {
    return this.checkoutForm.controls[controlName].invalid && this.checkoutForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.checkoutForm.controls[controlName].hasError(errorName)
  }

  checkout(value:any){
    console.log(value)

    let address :IAddress = {

      firstName: value.firstName,
    lastName: value.lastName,
    street: value.street,
    city: value.city
    }
    const basketId = localStorage.getItem('basket_id');
    if(basketId!==null){
      let orderToCreate : IOrderToCreate = {
        basketId: basketId,
        deliveryMethodId: parseInt(value.deliveryMethod),
        shipToAddress: address
      }

      this.checkoutService.createOrder(orderToCreate).subscribe(x => {
        console.log(x)
      });
    }
    
    
   
  }

  getDeliveryMethod(){
    this.checkoutService.getDeliveryMethods().subscribe(val => {
      this.deliveryMethods = val;
      console.log(this.deliveryMethods)
    })
  }

}
