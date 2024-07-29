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
    DialogModule
  ],
  templateUrl: './view-approv.component.html',
  styleUrl: './view-approv.component.css',
  providers: [MessageService],
})
export class ViewApprovComponent  implements OnInit{

  fournisseurs!:Fournisseurs[];
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  constructor(private messageService: MessageService, private providerService : FournisseursService){}

  ngOnInit() {
    this.providerService.getAllProviders().subscribe((res: any) => {
      if (!res.error && res) {
        this.fournisseurs = res.data;
        this.messageService.add({ key: 'toast2', severity: 'success', summary: res.statut, detail: res.message });
      } else {
        if (res.error.statut == 'error') {
          this.messageService.add({ key: 'toast2', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          return;
        }
        if (res.error.statut == 'errorstatement') {
          this.messageService.add({ key: 'toast2', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          return;
        }
      }

    });
  }

  deleteProvider(id:any){
    this.providerService.deleteCategorie(id).subscribe((res: any) => {
      if (!res.error && res) {
        this.messageService.add({ key: 'toast3', severity: 'success', summary: 'Succès', detail: res.message });

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
}
