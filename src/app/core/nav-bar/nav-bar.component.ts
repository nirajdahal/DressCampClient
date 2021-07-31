import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AccountService } from 'src/app/feature/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isUserAuthenticated!: boolean;
  isExternalAuth!: boolean;
  constructor(private _authService: AccountService, private _router: Router, private _socialAuthService: SocialAuthService) { }
  ngOnInit(): void {
    this._authService.authChanged
    .subscribe((res: boolean) => {
      this.isUserAuthenticated = res;
    })

    this._socialAuthService.authState.subscribe(user => {
      this.isExternalAuth = user != null;
    })
    
  }

  public logout = () => {
    this._authService.logout();
    if(this.isExternalAuth)
      this._authService.signOutExternal();
    this._router.navigate(["/account/login"]);
  }

  public TestCont(){
   this._authService.testControl().subscribe(r =>
    
    {})
  }

}
