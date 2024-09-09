import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Categories } from '../../domains/categories';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-sup-categories',
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
    TableModule,
    AvatarModule,
    ToastModule,
    ChipModule,
    DialogModule,
    SkeletonModule
  ],
  templateUrl: './sup-categories.component.html',
  styleUrl: './sup-categories.component.css',
  providers: [MessageService],
})
export class SupCategoriesComponent implements OnInit {

  categorie!: Categories[];
  loading: boolean = true;
  searchValue: string | undefined;

  constructor(private messageService: MessageService, private categorieService: CategoriesService, private router: Router) { }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }


  ngOnInit() {
    this.getSuperAdminInfos()
  }

  async getSuperAdminInfos() {
    await this.categorieService.getAllAdminCategories().then((value) => {
      if (value.length != 0) {
        this.loading = false;
        console.log(value);
        this.messageService.add({ key: 'toast3', severity: 'success', summary: 'Succès', detail: 'Données recupérées avec succès.' });
        value.forEach((element:any) => {
          if (element.idParent == null || element.idParent == '') {
            this.categorie = [element];
          }
        });

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
