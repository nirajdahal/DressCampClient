import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/feature/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isUserAuthenticated!: boolean;
  constructor(private _authService: AccountService, private _router: Router) { }
  ngOnInit(): void {
    this._authService.authChanged
    .subscribe((res: boolean) => {
      this.isUserAuthenticated = res;
    })
  }

  public logout = () => {
    this._authService.logout();
    this._router.navigate(["/account/login"]);
  }

}
