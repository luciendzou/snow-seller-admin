import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FournisseursService {

  constructor(private http: HttpClient, private authServie: AuthService, private router: Router) {
    authServie.loadStorage();
  }

  getAllProviders(): Observable<any> {
    const token = localStorage.getItem('userTokenAPI');
    if (!this.authServie.user) {
      this.router.navigate(['dashboard']);
    }
    const id = this.authServie.user.users_id!;
    let URL = URL_SERVICE + 'snowseller/admin/getAllProvider/' + id;
    if (!token) {
      return of(null);
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<any>(URL, { headers }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err: any) => {
        return of(err);
      })
    );;

  }


  setFournisseurToApi(name_provider: any,phone: any) {
    const token = localStorage.getItem('userTokenAPI');

    if (!this.authServie.user) {
      this.router.navigate(['dashboard']);
    }
    const id = this.authServie.user.users_id!;
    let URL = URL_SERVICE + 'snowseller/admin/provider/add';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });


    var myFormData = new FormData();

    myFormData.append('users_id', id);
    myFormData.append('name_provider', name_provider);
    myFormData.append('phone', phone);



    return this.http.post(URL, myFormData,{headers}).pipe(
      map((resp: any) => {
          return resp;
      }),
      catchError((err: any) => {
        return of(err);
      })
    );
  }



  deleteCategorie(id:any) {
    const token = localStorage.getItem('userTokenAPI');

    let URL = URL_SERVICE + 'snowseller/admin/Provider/delete/'+id;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });


    return this.http.post(URL, {},{headers}).pipe(
      map((resp: any) => {
          return resp;
      }),
      catchError((err: any) => {
        return of(err);
      })
    );
  }
}
