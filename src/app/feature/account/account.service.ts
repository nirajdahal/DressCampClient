import { Injectable } from '@angular/core';
import { UserForRegistrationDto } from 'src/app/shared/models/userForRegistrationDto';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  urlAddress = environment.apiUrl;

  constructor(private _http: HttpClient ) { }
  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this._http.post( this.urlAddress +"accounts/registration", body);
  }

}
