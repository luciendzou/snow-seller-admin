import { HttpClient, HttpHeaders } from '@angular/common/http';
import { afterRender, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { URL_SERVICE } from '../../config/config';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Categories } from '../domains/categories';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  user: any

  constructor(
    public afs: AngularFirestore,
    private authServie: AuthService,
    private LocalStorage: BrowserStorageService,
    private router: Router
  ) {

    this.user = JSON.parse(this.LocalStorage.get('user')!);

  }

  getAllAdminCategories() {
    return new Promise<any>((resolve) => {
      this.afs.collection('Categories', ref=> ref.where('idParent','==','')).valueChanges()
        .subscribe((categories: any) => {
          if (categories.length > 0 && categories[0].iduser == this.user.uid) {
            resolve(categories);
          }
        });
    })
  }

  getOneCategories(id: any) {
    return new Promise<any>((resolve) => {

      this.afs.collection('Categories').doc(id).valueChanges()
        .subscribe(categories => {
          resolve(categories);
        });
    })

  }



  setCategorieToApi(categorie: any, description: any, image: any) {
    const idCat = this.afs.createId();
    const CategorieData: Categories = {
      id: idCat,
      iduser: this.user.uid,
      nameCat: categorie,
      description_cat: description,
      imgCat: image,
      actived: false,
      idParent: ''
    };

    return this.afs.collection("Categories").doc(idCat).set(JSON.parse(JSON.stringify(CategorieData)));
  }


  updateCategorieToApi(categorie: string, description: string, statut: boolean, image: any, id: any) {
    const CategorieData: Categories = {
      nameCat: categorie,
      description_cat: description,
      imgCat: image,
      actived: statut,
    };

    return this.afs.collection("Categories").doc(id).update(JSON.parse(JSON.stringify(CategorieData)));
  }



  deleteCategorie(id: any): Promise<void> {
    return this.afs.collection('Categories').doc(id).delete();
  }
}
