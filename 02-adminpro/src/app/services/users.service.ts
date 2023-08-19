import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { UserRegisterForm } from '../interfaces/user-register-form.interface';
import { UserLoginForm } from '../interfaces/user-login-form.interface';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public createUser(formData: UserRegisterForm): Observable<any> {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('userToken', response?.token)
        })
      );
  }

  public loginUser(formData: UserLoginForm): Observable<any> {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('userToken', response?.token)
        })
      );
  }

  public loginGoogle(token: string): Observable<any> {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('userToken', response?.token)
        })
      );
  }

  public validateUserToken(): Observable<boolean> {
    const token = localStorage.getItem('userToken') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        "token": token
      }
    })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token)
        }),
        map((response: any) => true)
      );
  }


}
