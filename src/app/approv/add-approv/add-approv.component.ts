import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FournisseursService } from '../../services/fournisseurs.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-approv',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    NgbModule,
    ToastModule,
    CommonModule,
  ],
  templateUrl: './add-approv.component.html',
  styleUrl: './add-approv.component.css',
  providers: [MessageService],
})
export class AddApprovComponent {
  applyForm = new FormGroup({
    provider: new FormControl(''),
    phone: new FormControl(''),
  });

  isLoading : boolean = false;

  constructor(
    private providerService: FournisseursService,
    private messageService: MessageService,
    private router: Router
  ) {}

  submitApplication() {
    this.isLoading = true;
    this.providerService
      .setFournisseurToApi(
        this.applyForm.value.provider ?? '',
        this.applyForm.value.phone ?? ''
      )
      .subscribe((res: any) => {
        if (!res.error && res) {
          this.messageService.add({
            key: 'toast2',
            severity: 'success',
            summary: res.statut,
            detail: res.message,
          });
          this.isLoading = false;
          this.router.navigate(['providers-stock']);
        } else {
          if (res.error.statut == 'error') {
            this.messageService.add({
              key: 'toast2',
              severity: res.error.statut,
              summary: 'Erreur',
              detail: res.error.message,
            });
            this.isLoading = false;
            return;
          }
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
}
