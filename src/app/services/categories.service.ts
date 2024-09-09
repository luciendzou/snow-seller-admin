import { HttpClient, HttpHeaders } from '@angular/common/http';
import { afterRender, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { URL_SERVICE } from '../../config/config';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categories } from '../domains/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient, public afs: AngularFirestore,private authServie: AuthService, private router: Router) {

  }

  getAllAdminCategories() {
    return new Promise<any>((resolve)=>{

      this.afs.collection('Categories').valueChanges({ 'idParent': null })
      .subscribe(categories => {
          resolve(categories);
      });
    })
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



  setCategorieToApi(categorie: any, description: any, image: any) {
    const idCat = this.afs.createId();
    const CategorieData: Categories = {
      id: idCat,
      iduser: this.authServie.uid,
      idParent: '',
      nameCat: categorie,
      description_cat: description,
      imgCat: image,
      actived: false,
    };

    return this.afs.collection("Categories").doc(idCat).set(JSON.parse(JSON.stringify(CategorieData)));
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



  deleteCategorie(id:any): Promise<void> {
    return this.afs.collection('Categories').doc(id).delete();
  }
}
