import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categories } from '../domains/categories';

@Injectable({
  providedIn: 'root'
})
export class SouscategoriesService {


  constructor(public afs: AngularFirestore,private authServie: AuthService, private router: Router) {
    this.authServie.loadUser();
  }


  getAllAdminSousCategories(id:any) {

    return new Promise<any>((resolve)=>{
      this.afs.collection('Categories',ref => ref.where('idParent', '==', id).where('iduser', '==', this.authServie.uid)).valueChanges()
      .subscribe(categories => {
          resolve(categories);
      });
    })

  }

  getOneCategories(id:any) {
    return new Promise<any>((resolve)=>{
      this.afs.collection('Categories').doc(id).valueChanges()
      .subscribe(categories => {
          resolve(categories);
      });
    })
  }

  setCategorieToApi(categorie: any, description: any, image: any, idParent:any) {
    const idCat = this.afs.createId();
    const CategorieData: Categories = {
      id: idCat,
      iduser: this.authServie.uid,
      nameCat: categorie,
      description_cat: description,
      imgCat: image,
      actived: false,
      idParent: idParent
    };

    return this.afs.collection("Categories").doc(idCat).set(JSON.parse(JSON.stringify(CategorieData)));
  }

}
