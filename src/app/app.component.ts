import { Component, OnInit } from '@angular/core';
import { AccountService } from './feature/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private _accountService: AccountService) {
 
    
  }
  ngOnInit(): void {


    if(this._accountService.isUserAuthenticated()){
      console.log("i am in")
        this._accountService.sendAuthStateChangeNotification(true);
    }
  
  }
  
}
