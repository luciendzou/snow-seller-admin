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
export class SupCategoriesComponent  implements OnInit {

  categorie!: Categories[];
  loading: boolean = true;
  searchValue: string | undefined;

  constructor(private messageService: MessageService, private categorieService: CategoriesService, private router: Router) { }
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }


  ngOnInit() {
    this.categorieService.getAllAdminCategories().subscribe((res: any) => {
      if (!res.error && res) {
        this.categorie = res.data;
        this.messageService.add({ key: 'toast3', severity: 'success', summary: 'Succès', detail: 'Données recupérées avec succès.' });
        this.loading = false;
      } else {
        if (res.error.statut == 'errorstatement') {
          this.messageService.add({ key: 'toast3', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          this.loading = false;
          return;
        }
      }

    });
  }


  deteleCategorie(CategorieId: any) {
    this.categorieService.deleteCategorie(
      CategorieId
    ).subscribe((res: any) => {
      if (!res.error && res) {
        this.messageService.add({ key: 'toast3', severity: 'success', summary: 'Succès', detail: 'Catégorie supprimée avec succès.' });

        window.location.reload()
      } else {
        if (res.error.statut == 'error') {
          this.messageService.add({ key: 'toast3', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          return;
        }
        if (res.error.statut == 'errorstatement') {
          this.messageService.add({ key: 'toast3', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          return;
        }
      }
    });
  }



  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }

}
