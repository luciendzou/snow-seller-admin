import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { URL_SERVICE } from '../../config/config';
import { catchError, map, Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Products } from '../domains/categories';

@Injectable({
  providedIn: 'root',
})
export class CommandesService {
  constructor(
    private http: HttpClient,
    private authServie: AuthService,
    private router: Router,
    public afs: AngularFirestore,
  ) { }


  viewStoreProduct(id: any) {
    return new Promise<any>((resolve) => {
      this.afs.collection('Products').valueChanges()
        .subscribe((produits: any) => {
          if (produits.length > 0 && produits[0].iduser == id) {
            resolve(produits);
          } else {
            resolve(produits);
          }
        });
    })

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
    code_product: any,
    iduser: any,
    monnaie: any,
  ) {
    const idCat = this.afs.createId();
    const ProductsData: Products = {
      product_id: idCat,
      souscat_id: souscat_id,
      provider_id: provider_id,
      users_id: iduser,
      title: title,
      price: price + ' ' + monnaie,
      tags: tags,
      description: description,
      summary: summary,
      state: '',
      interview: '',
      stock: stock,
      image: image,
      code_product: code_product,
      created_at: Date.now(),
    };

    return this.afs.collection("Products").doc(idCat).set(JSON.parse(JSON.stringify(ProductsData)));
  }
}
