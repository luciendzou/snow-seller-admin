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
    values:new FormControl('')
  });

  isLoading:boolean = false;

  SousCategories!: any[];
  Forunisseurs!: any[];
  iduser: any;
  selectedImage: any;
  link: any;
  code_prod:any;


  route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private catService: SouscategoriesService,
    private fourServices: FournisseursService,
    private userService: AuthService,
    private commandes : CommandesService,
    private messageService : MessageService,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.code_prod = localStorage.getItem("code_prod");

    this.iduser = this.userService.user.users_id;




  }

  getFournisseursList(data: any) {
    this.Forunisseurs = data;
  }

  CategoriesList(data: any) {
    this.SousCategories = data;
  }


  submitApplication() {
    this.commandes.storeCommandeData(
      this.applyForm.value.categorie ?? '',
      this.applyForm.value.fournisseur ?? '',
      this.applyForm.value.title ?? '',
      this.applyForm.value.price ?? '',
      this.applyForm.value.values ?? '',
      this.applyForm.value.description ?? '',
      this.applyForm.value.summary ?? '',
      this.applyForm.value.stock ?? '',
      this.selectedImage,
      this.code_prod
    ).subscribe((res:any)=>{

      if (!res.error && res) {
        this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Catégorie ajoutée avec succès.' });
        this.isLoading=false;
        this.router.navigate(['approv-stock'])
      } else {
        if (res.error.statut == 'error') {
          this.messageService.add({ key: 'toast2', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          this.isLoading=false;
          return;
        }
        if (res.error.statut == 'errorstatement') {
          this.isLoading=false;
          this.messageService.add({ key: 'toast2', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          return;
        }
      }
    })
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
