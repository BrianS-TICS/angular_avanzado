import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterForm } from '../interfaces/user-register-form.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public createUser(formData: UserRegisterForm) : Observable<any> {
    console.log('creando usuario ' + formData);
    return this.http.post(`${base_url}/users`, formData);

  }

}
