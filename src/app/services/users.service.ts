import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { URL_SERVICE } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private authServie: AuthService, private router : Router) {
    this.authServie.loadUser();
  }


  getUsersCount(): Observable<any> {
    const token = localStorage.getItem('userTokenAPI');
    if (!this.authServie.user) {
      this.router.navigate(['dashboard']);
    }
    const id = this.authServie.user.users_id!;
    const telephone = this.authServie.user.telephone!;
    let URL = URL_SERVICE + 'snowseller/admin/' + id + '/' + telephone;


    if (!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    }
    );

    return this.http.get<any>(URL, { headers });

  }

}
