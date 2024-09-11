import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommandesService } from '../../services/commandes.service';
import { AvatarModule } from 'primeng/avatar';
import { Products } from '../../domains/categories';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { FournisseursService } from '../../services/fournisseurs.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-view-commandes',
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
    ToastModule,
    DialogModule,
    AvatarModule,
  ],
  templateUrl: './view-commandes.component.html',
  styleUrl: './view-commandes.component.css',
  providers: [MessageService],
})
export class ViewCommandesComponent implements OnInit {
  Products!: Products[];
  visible: boolean = false;
  isLoading: boolean = false;
  categories:any;
  marques:any;
  code: any;
  user:any;

  constructor(
    private proServices: CommandesService,
    private markServices: FournisseursService,
    private CatServices: CategoriesService,
    private messageService: MessageService,
    private LocalStorage: BrowserStorageService
  ) {

    this.user = JSON.parse(this.LocalStorage.get('user')!);
  }

  ngOnInit(): void {
    this.code =
      'SN' +
      Math.floor(Math.random() * (999999 - 100000)) +
      100000 +
      'SE' +
      new Date().getFullYear();
    this.LocalStorage.set('code_prod', this.code);

    this.proServices.viewStoreProduct(this.user.uid).then((value) => {
      if (value.length > 0) {
        this.isLoading = false;
        this.messageService.add({ key: 'toast3', severity: 'success', summary: 'Succès', detail: 'Données recupérées avec succès.' });
        this.Products = value;
        this.CatServices.getOneCategories(value[0].souscat_id).then(res=> this.categories=res.nameCat);
        this.markServices.getOneProvider(value[0].provider_id).then(res=> this.marques=res[0].nom);
      } else {
        this.messageService.add({
          key: 'toast3',
          severity: 'error',
          summary: 'Données vides',
          detail: 'Désolé, données non recupérées',
        });
        this.isLoading = false;
        return;
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  deleteCommand(id: any) {}
}
