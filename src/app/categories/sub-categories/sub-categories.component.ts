import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { SouscategoriesService } from '../../services/souscategories.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { CategoriesService } from '../../services/categories.service';
import { AvatarModule } from 'primeng/avatar';
import { Categories } from '../../domains/categories';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    AutoCompleteModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ToastModule,
    TableModule,
    ChipModule,
    DialogModule,
    SkeletonModule,
    AvatarModule,
  ],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css',
  providers: [MessageService],
})
export class SubCategoriesComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);

  Onecategorie!: string;
  Souscategorie!: Categories[];
  CategorieId!:number;
  loading: boolean = true;
  searchValue: string | undefined;
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  constructor(
    private categorieService: CategoriesService,
    private messageService: MessageService,
    private sousCategorieService: SouscategoriesService,
    private router: Router) {
     this.CategorieId = this.route.snapshot.params['id'];
    this.getAllSousCategories();
  }

  ngOnInit() {
    this.sousCategorieService.getOneCategories(this.CategorieId).then((res: any) => {
        this.Onecategorie = res.nameCat;
    });

  }

  getAllSousCategories(){
    this.sousCategorieService.getAllAdminSousCategories(this.CategorieId).then((value) => {

      if (value.length > 0) {
        this.loading = false;
        this.messageService.add({ key: 'toast3', severity: 'success', summary: 'Succès', detail: 'Données recupérées avec succès.' });
        this.Souscategorie = value;
      } else {
        this.messageService.add({
          key: 'toast3',
          severity: 'error',
          summary: 'Données vides',
          detail: 'Désolé, données non recupérées',
        });
        this.loading = false;
        return;
      }
    });
  }


  async deteleCategorie(CategorieId: any) {
    await this.categorieService.deleteCategorie(
       CategorieId
     ).then((res: any) => {
         this.messageService.add({ key: 'toast3', severity: 'success', summary: 'Succès', detail: 'Catégorie supprimée avec succès.' });
         window.location.reload()

     }).catch((error)=>{
       this.messageService.add({ key: 'toast3', severity: 'error', summary: 'Erreur', detail: error.message });
     });
   }



  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }
}
