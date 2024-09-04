import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { URL_SERVICE } from '../../config/config';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandesService {
  constructor(
    private http: HttpClient,
    private authServie: AuthService,
    private router: Router
  ) {}


  viewStoreProduct(): Observable<any> {
    const token = localStorage.getItem('userTokenAPI');
    if (!this.authServie.user) {
      this.router.navigate(['dashboard']);
    }
    const id = this.authServie.user.users_id!;
    let URL = URL_SERVICE + 'snowseller/admin/products/view/' + id;
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


  storeCommandeData(
    souscat_id: any,
    provider_id: any,
    title: any,
    price: any,
    tags: any,
    description: any,
    summary: any,
    stock: any,
    image: any,
    code_product: any
  ) {
    const token = localStorage.getItem('userTokenAPI');

    if (!this.authServie.user) {
      this.router.navigate(['dashboard']);
    }
    const id = this.authServie.user.users_id!;
    let URL = URL_SERVICE + 'snowseller/admin/product/add';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    headers.append('Content-Type', 'multipart/form-data');

    var myFormData = new FormData();

    myFormData.append('souscat_id', souscat_id);
    myFormData.append('provider_id', provider_id);
    myFormData.append('users_id', id);
    myFormData.append('title', title);
    myFormData.append('price', price);
    myFormData.append('tags', tags);
    myFormData.append('description', description);
    myFormData.append('summary', summary);
    myFormData.append('state', '0');
    myFormData.append('interview', '0');
    myFormData.append('stock', stock);
    myFormData.append('image', image);
    myFormData.append('code_product', code_product);

    return this.http.post(URL, myFormData, { headers }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err: any) => {
        return of(err);
      })
    );
  }
}
