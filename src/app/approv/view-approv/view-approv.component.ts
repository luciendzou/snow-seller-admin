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
import { Fournisseurs } from '../../domains/fournisseurs';
import { FournisseursService } from '../../services/fournisseurs.service';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-view-approv',
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
    AvatarModule
  ],
  templateUrl: './view-approv.component.html',
  styleUrl: './view-approv.component.css',
  providers: [MessageService],
})
export class ViewApprovComponent implements OnInit {
  fournisseurs!: Fournisseurs[];
  visible: boolean = false;
  loading: boolean = true;

  showDialog() {
    this.visible = true;
  }

  constructor(
    private messageService: MessageService,
    private providerService: FournisseursService
  ) {
    this. getAllMarques();
  }

  ngOnInit() {

  }

  getAllMarques(){
    this.providerService.getAllProviders().then((value) => {

      if (value.length != 0) {
        this.loading = false;
        this.messageService.add({ key: 'toast3', severity: 'success', summary: 'Succès', detail: 'Données recupérées avec succès.' });
        this.fournisseurs = value;
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

  deleteProvider(id: any) {
    this.providerService.deleteCategorie(id).subscribe((res: any) => {
      if (!res.error && res) {
        this.messageService.add({
          key: 'toast3',
          severity: 'success',
          summary: 'Succès',
          detail: res.message,
        });

        window.location.reload();
      } else {
        if (res.error.statut == 'error') {
          this.messageService.add({
            key: 'toast3',
            severity: res.error.statut,
            summary: 'Erreur',
            detail: res.error.message,
          });
          return;
        }
        if (res.error.statut == 'errorstatement') {
          this.messageService.add({
            key: 'toast3',
            severity: res.error.statut,
            summary: 'Erreur',
            detail: res.error.message,
          });
          return;
        }
      }
    });
  }
}
