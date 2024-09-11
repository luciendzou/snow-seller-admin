import { Component, inject, OnInit } from '@angular/core';
import { SouscategoriesService } from '../../services/souscategories.service';
import { FournisseursService } from '../../services/fournisseurs.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { CommandesService } from '../../services/commandes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-add-commande',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule,
    NgbModule,
    CommonModule,
    ChipsModule
  ],
  templateUrl: './add-commande.component.html',
  styleUrl: './add-commande.component.css',
  providers: [MessageService],
})
export class AddCommandeComponent implements OnInit {
  applyForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    categorie: new FormControl(''),
    fournisseur: new FormControl(''),
    description: new FormControl(''),
    summary: new FormControl(''),
    values: new FormControl(''),
    monnaie: new FormControl('')
  });

  isLoading: boolean = false;

  SousCategories!: any[];
  Forunisseurs!: any[];
  iduser: any;
  selectedImage: any;
  link: any;
  code_prod: any;
  user: any;
  monnaieData: any;


  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private catService: SouscategoriesService,
    private fourServices: FournisseursService,
    private userService: AuthService,
    private commandes: CommandesService,
    private messageService: MessageService,
    private router: Router,
    private LocalStorage: BrowserStorageService
  ) {
    this.user = JSON.parse(this.LocalStorage.get('user')!);
    this.LocalStorage.remove('imageLink');
  }

  ngOnInit(): void {
    this.monnaieData = [{ 'signe': 'XAF', 'name': 'Franc CFA', }, { 'signe': '$', 'name': 'Dollars', },{ 'signe': '€', 'name': 'Euro', }]
    this.code_prod = this.LocalStorage.get("code_prod");
    this.iduser = this.user.uid;
    this.getFournisseursList()
    this.CategoriesList()
  }

  getFournisseursList() {
    this.fourServices.getAllProviders().then((value) => {
      this.Forunisseurs = value;
    })
  }

  CategoriesList() {
    this.catService.getAllSousCategories().then((value) => {
      this.SousCategories = value;
    })
  }


  submitApplication() {
    this.isLoading = true;
    var linker = this.LocalStorage.get('imageLink');
    this.userService.saveFileInFirebase('Marques/', this.selectedImage);
    linker = this.LocalStorage.get('imageLink');
    if (linker == '' || linker == null) {
      linker = this.LocalStorage.get('imageLink');
      console.log(linker);
      if (linker == '' || linker == null) {
        this.isLoading = false;
        return;
      }
      this.commandes.storeCommandeData(
        this.applyForm.value.categorie ?? '',
        this.applyForm.value.fournisseur ?? '',
        this.applyForm.value.title ?? '',
        this.applyForm.value.price ?? '',
        this.applyForm.value.values ?? '',
        this.applyForm.value.description ?? '',
        this.applyForm.value.summary ?? '',
        this.applyForm.value.stock ?? '',
        linker,
        this.code_prod,
        this.user.uid,
        this.applyForm.value.monnaie ?? '',
      ).then((e) => {
        this.isLoading = false;
        this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Le produit a été ajouté avec succès.' });

        this.LocalStorage.remove('imageLink')
        this.router.navigate(['approv-stock'])
        return;
      }).catch((error) => {
        this.isLoading = false;
        this.LocalStorage.remove('imageLink')
        this.router.navigate(['approv-stock'])
        this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Erreur', detail: error.message });
        return;
      });

    } else {
      linker = this.LocalStorage.get('imageLink');
      this.commandes.storeCommandeData(
        this.applyForm.value.categorie ?? '',
        this.applyForm.value.fournisseur ?? '',
        this.applyForm.value.title ?? '',
        this.applyForm.value.price ?? '',
        this.applyForm.value.values ?? '',
        this.applyForm.value.description ?? '',
        this.applyForm.value.summary ?? '',
        this.applyForm.value.stock ?? '',
        linker,
        this.code_prod,
        this.user.uid,
        this.applyForm.value.monnaie ?? '',
      ).then((e) => {
        this.isLoading = false;
        this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Le produit a été ajouté avec succès.' });

        this.LocalStorage.remove('imageLink')
        this.router.navigate(['providers-stock'])
        return;
      }).catch((error) => {
        this.isLoading = false;
        this.LocalStorage.remove('imageLink')
        this.router.navigate(['providers-stock'])
        this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Erreur', detail: error.message });
        return;
      });
    }
  }

  onSelectImage(event: any) {
    this.selectedImage = event.srcElement.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      return (this.link = reader.result);
    };
    reader.readAsDataURL(this.selectedImage);
  }


}
