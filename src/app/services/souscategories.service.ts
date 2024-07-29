import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SouscategoriesService {


  constructor(private http: HttpClient, private authServie: AuthService, private router: Router) {
    authServie.loadStorage();
  }


  getAllAdminSousCategories(id:any): Observable<any> {
    const token = localStorage.getItem('userTokenAPI');

    let URL = URL_SERVICE + 'snowseller/admin/getalladminsouscategories/' + id;
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


  getAllByIdAdminSousCategories(): Observable<any> {
    const token = localStorage.getItem('userTokenAPI');

    if (!this.authServie.user) {
      this.router.navigate(['dashboard']);
    }
    const id = this.authServie.user.users_id!;
    let URL = URL_SERVICE + 'snowseller/admin/getallByIdAdminsouscategories/' + id;
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


  setCategorieToApi(categorie: string, statut: string,  id: any) {
    const token = localStorage.getItem('userTokenAPI');

    let URL = URL_SERVICE + 'snowseller/admin/addSousCategories ';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });


    var myFormData = new FormData();

    myFormData.append('cat_id', id);
    myFormData.append('name_cat', categorie);
    myFormData.append('statut', statut);



    return this.http.post(URL, myFormData,{headers}).pipe(
      map((resp: any) => {
          return resp;
      }),
      catchError((err: any) => {
        return of(err);
      })
    );
  }


  deleteSousCategorie(id:any) {
    const token = localStorage.getItem('userTokenAPI');

    let URL = URL_SERVICE + 'snowseller/admin/souscategories/delete/'+id;

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


  getOneSousCategories(id:any): Observable<any> {
    const token = localStorage.getItem('userTokenAPI');
    let URL = URL_SERVICE + 'snowseller/admin/SousCategorie/detail/' + id;
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



  updateSousCategorieToApi(categorie: string, statut: string, id:any) {
    const token = localStorage.getItem('userTokenAPI');

    let URL = URL_SERVICE + 'snowseller/admin/SousCategorie/update/'+id;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    var myFormData = new FormData();

    myFormData.append('souscat_id', id);
    myFormData.append('name_cat', categorie);
    myFormData.append('statut', statut);


    return this.http.post(URL, myFormData,{headers}).pipe(
      map((resp: any) => {
          return resp;
      }),
      catchError((err: any) => {
        return of(err);
      })
    );
  }
}
