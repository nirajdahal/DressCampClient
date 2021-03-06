import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/feature/account/account.service';
import { BasketService } from 'src/app/feature/basket/basket.service';
import { IBasket } from 'src/app/shared/models/baskets/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isUserAuthenticated!: boolean;
  isExternalAuth!: boolean;
  basket$!: Observable<IBasket | null> ;
  constructor(private _authService: AccountService,private _basketService: BasketService, private _router: Router, private _socialAuthService: SocialAuthService) { }
  ngOnInit(): void {
    this._authService.authChanged
    .subscribe((res: boolean) => {
      this.isUserAuthenticated = res;
    })

    this._socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
    })

    this.basket$ = this._basketService.basket$;
  }

  public logout = () => {
    this._authService.logout();
    if(this.isExternalAuth){
      this._authService.signOutExternal();
    }
      
      localStorage.removeItem('basket_id');
      this._basketService.basketSource.next(null);
    
    this._router.navigate(["/account/login"]);
  }

  public TestCont(){
   this._authService.testControl().subscribe(r =>
    
    {})
  }

}
