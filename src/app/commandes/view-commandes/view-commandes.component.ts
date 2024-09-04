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
  code: any;

  constructor(
    private proServices: CommandesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.code =
      'SN' +
      Math.floor(Math.random() * (999999 - 100000)) +
      100000 +
      'SE' +
      new Date().getFullYear();
    localStorage.setItem('code_prod', this.code);

    this.proServices.viewStoreProduct().subscribe((res: any) => {
      if (!res.error && res) {
        console.log(res.data);
        if (res.data.length == 0) {
          this.messageService.add({
            key: 'toast2',
            severity: 'error',
            summary: 'Données vides',
            detail: 'Désolé, données non recupérées',
          });
          this.isLoading = false;
        } else {
          this.Products = res.data;
          this.messageService.add({
            key: 'toast2',
            severity: 'success',
            summary: 'Succès',
            detail: 'Données recupérées avec succès.',
          });
          this.isLoading = false;
        }
      } else {
        if (res.error.statut == 'errorstatement') {
          this.messageService.add({
            key: 'toast2',
            severity: res.error.statut,
            summary: 'Erreur',
            detail: res.error.message,
          });
          this.isLoading = false;
          return;
        }
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  deleteCommand(id: any) {}
}
