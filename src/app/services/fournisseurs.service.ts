import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BrowserStorageService } from './browser-storage.service';
import { Fournisseurs } from '../domains/fournisseurs';

@Injectable({
  providedIn: 'root'
})
export class FournisseursService {

  user: any;

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,
    private authServie: AuthService,
    private LocalStorage: BrowserStorageService,
    private router: Router
  ) {

    this.user = JSON.parse(this.LocalStorage.get('user')!);
  }

  getAllProviders() {
    return new Promise<any>((resolve) => {
      this.afs.collection('Marques').valueChanges()
        .subscribe((marques: any) => {
          if (marques.length > 0 && marques[0].iduser == this.user.uid) {
            resolve(marques);
          }
        });
    })
  }

  getOneProvider(id: any) {

    return new Promise<any>((resolve) => {
      this.afs.collection('Marques', ref => ref.where('id','==',id)).valueChanges()
        .subscribe((marques: any) => {
          if (marques.length > 0) {
            resolve(marques);
          }
        });
    })

  }


  setFournisseurToApi(name_provider: any, image: any) {
    const idCat = this.afs.createId();
    const MarquesData: Fournisseurs = {
      id: idCat,
      iduser: this.user.uid,
      nom: name_provider,
      image: image
    };

    return this.afs.collection("Marques").doc(idCat).set(JSON.parse(JSON.stringify(MarquesData)));
  }




  deleteCategorie(id: any): Promise<void> {
    return this.afs.collection('Marques').doc(id).delete();
  }

}
