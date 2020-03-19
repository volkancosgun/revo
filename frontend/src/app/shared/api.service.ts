import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  checkStatus = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.checkStatus.asObservable();

  constructor(private _http: HttpClient) { }

  checkLogin() {
    const token = localStorage.getItem('access_token');
    if(token) {
      this.checkStatus.next(true);
    }else{
      this.checkStatus.next(false);
    }
    //this.checkStatus.next(status);
  }

  loginUser(user:any) {


    return this._http.post(`${environment.apiUrl}/auth/login`, user);

    /* return this._http.post(`${environment.apiUrl}/auth/login`, user).subscribe((res:any) => {

      if(res.access_token) {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));

        this.checkLogin();
      }

    }); */
  }

  logoutUser() {

    const access_token = localStorage.getItem('access_token');

    return this._http.post(`${environment.apiUrl}/auth/logout`, {token:access_token}).subscribe(msg => {
      if(msg) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this.checkLogin();
      }
    });
  }

  registerUser(user:any) {
    return this._http.post(`${environment.apiUrl}/auth/register`, user);
  }

}
