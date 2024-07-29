import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { SousCategories } from '../../domains/categories';
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
    SkeletonModule
  ],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css',
  providers: [MessageService],
})
export class SubCategoriesComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);

  Onecategorie!: string;
  Souscategorie!: SousCategories[];
  CategorieId!:number;
  loading: boolean = true;
  searchValue: string | undefined;
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  constructor(private messageService: MessageService, private sousCategorieService: SouscategoriesService, private router: Router) {
     this.CategorieId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {

    this.sousCategorieService.getAllAdminSousCategories(this.CategorieId).subscribe((res: any) => {
      if (!res.error && res) {
        this.Souscategorie = res.data;
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

    this.sousCategorieService.getOneCategories(this.CategorieId).subscribe((res: any) => {

      if (!res.error && res) {
        this.Onecategorie = res.data[0].name_cat;
      }

    })

  }


  deteleCategorie(CategorieId: any) {
    this.sousCategorieService.deleteSousCategorie(
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
