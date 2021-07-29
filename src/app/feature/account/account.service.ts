import { Injectable } from '@angular/core';
import { UserForRegistrationDto } from 'src/app/shared/models/userForRegistrationDto';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  LoginResponse, UserForAuthenticationDto } from 'src/app/shared/models/UserForAuthenticationDto';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  urlAddress = environment.apiUrl;
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  constructor(private _http: HttpClient ) { }
  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this._http.post( this.urlAddress +"accounts/registration", body);
  }

  public loginUser = (userForAuthenticationDto: UserForAuthenticationDto) => {

    let body = userForAuthenticationDto;
    return this._http.post<LoginResponse>(this.urlAddress +"accounts/login", body);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

}
