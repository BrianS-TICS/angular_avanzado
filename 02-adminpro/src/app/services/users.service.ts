import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { UserRegisterForm } from '../interfaces/user-register-form.interface';
import { UserLoginForm } from '../interfaces/user-login-form.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const google: any;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public auth2: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }


  public createUser(formData: UserRegisterForm): Observable<any> {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('userToken', response?.token)
        })
      );
  }


  public googleInit() {

    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1045072534136-oqkjcjvo449uls0bttgvl3aejelh22f5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }


  public logout() {
    localStorage.removeItem('userToken')

    google.accounts.id.revoke(localStorage.getItem('userEmail'), () => {
      localStorage.removeItem('userEmail')
      this.router.navigateByUrl('/login')
    })
  }

  public loginUser(formData: UserLoginForm): Observable<any> {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('userEmail', formData.email)
          localStorage.setItem('userToken', response?.token)
        })
      );
  }

  public loginGoogle(token: string): Observable<any> {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('userEmail', response.user.email)
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
          localStorage.setItem('userToken', response.token)
        }),
        map((response: any) => true),
        catchError(error => of(false))
      );
  }


}
