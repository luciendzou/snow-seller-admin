import { HttpClient, HttpHeaders } from '@angular/common/http';
import { afterRender, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { URL_SERVICE } from '../../config/config';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private authServie: AuthService, private router: Router) {

  }

  getAllAdminCategories(): Observable<any> {
    const token = localStorage.getItem('userTokenAPI');
    if (!this.authServie.user) {
      this.router.navigate(['dashboard']);
    }
    const id = this.authServie.user.users_id!;
    let URL = URL_SERVICE + 'snowseller/admin/getalladmincategories/' + id;
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

  getOneCategories(id:any): Observable<any> {
    const token = localStorage.getItem('userTokenAPI');
    let URL = URL_SERVICE + 'snowseller/admin/categories/detail/' + id;
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


  setCategorieToApi(categorie: any, description: any, statut: any,  image: any) {
    const token = localStorage.getItem('userTokenAPI');

    if (!this.authServie.user) {
      this.router.navigate(['dashboard']);
    }
    const id = this.authServie.user.users_id!;
    let URL = URL_SERVICE + 'snowseller/admin/categories/add';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    headers.append('Content-Type', 'multipart/form-data');


    var myFormData = new FormData();

    myFormData.append('superadmin_id', id);
    myFormData.append('name_cat', categorie);
    myFormData.append('description_cat', description);
    myFormData.append('statut', statut);
    myFormData.append('image', image);



    return this.http.post(URL, myFormData,{headers}).pipe(
      map((resp: any) => {
          return resp;
      }),
      catchError((err: any) => {
        return of(err);
      })
    );
  }


  updateCategorieToApi(categorie: string, description: string, statut: string,  image: any, link:any, id:any) {
    const token = localStorage.getItem('userTokenAPI');

    let URL = URL_SERVICE + 'snowseller/admin/categories/update/'+id;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    headers.append('Content-Type', 'multipart/form-data');


    var myFormData = new FormData();

    myFormData.append('superadmin_id', id);
    myFormData.append('name_cat', categorie);
    myFormData.append('description_cat', description);
    myFormData.append('statut', statut);
    myFormData.append('image', image);
    myFormData.append('link', link);



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

    let URL = URL_SERVICE + 'snowseller/admin/categories/delete/'+id;

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
