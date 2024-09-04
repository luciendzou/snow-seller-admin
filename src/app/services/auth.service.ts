import { HttpClient, HttpHeaders } from '@angular/common/http';
import { afterNextRender, afterRender, Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  token: any = '';
  constructor(private http: HttpClient, private router: Router, private LocalStorage : BrowserStorageService) {
      this.loadStorage();
  }


  isLoggedIn(): boolean {
    let token;
    token = this.LocalStorage.get("userTokenAPI");
    return (token !== null) ? true : false;
  }


  loadStorage() {

    if (this.LocalStorage.get("userTokenAPI") && this.LocalStorage.get("userData")) {
      this.token = this.LocalStorage.get("userTokenAPI");
      this.user = JSON.parse(this.LocalStorage.get("userData") ?? '');
    }
    else {
      this.token = '';
      this.user = null;
    }
  }

  getUserLogin(telephone: any, password: any): Observable<any> {
    let URL = URL_SERVICE + 'snowseller/admin/auth';
    return this.http.post(URL, { telephone, password }).pipe(
      map((resp: any) => {
        console.log(resp);

        if (resp.token) {
          return this.saveLocalStorageResponse(resp);
        } else {
          return resp;
        }
      }),
      catchError((err: any) => {
        return of(err);
      })
    );
  }


  logout() {
    this.token = null;
    this.user = '';
    this.LocalStorage.remove('userTokenAPI');
    this.LocalStorage.remove('userData');
    this.router.navigate(['/login']);
  }


  saveLocalStorageResponse(resp: any) {
    if (resp.token && resp.data) {
      this.LocalStorage.set("userTokenAPI", resp.token);
      this.LocalStorage.set("userData", JSON.stringify(resp.data));
      this.user = resp.user;
      this.token = resp.access_token
      return true;

    }
    return false;

  }


  getUsersCount(): Observable<any> {
    const token = this.LocalStorage.get('userTokenAPI');
    if (!this.user) {
      this.router.navigate(['dashboard']);
    }
    const id = this.user.users_id!;
    const telephone = this.user.telephone!;
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
