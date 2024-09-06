import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SuperAdmin } from '../../domains/super-admin';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-registerpage',
  standalone: true,
  imports: [
    StepperModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    RippleModule,
    ToastModule,
    NgbModule,
    CommonModule
  ],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css',
  providers: [MessageService],
})
export class RegisterpageComponent {
  superadmin!: SuperAdmin;

  isSubmitted: boolean = false;
  selectedImage: any;
  link: any;

  userDate?: SuperAdmin;

  applyForme = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    entreprise: new FormControl(''),
    telephone: new FormControl(''),
    password: new FormControl(''),
    logo: new FormControl(''),
    nui: new FormControl(''),
    detail_entreprise: new FormControl(''),
    sigle: new FormControl(''),
  });

  constructor(private messageService: MessageService, private router: Router, RegisterService: AuthService,) {

  }

  previewInfos() {

    if (this.applyForme.value.nom != '') {

    } else {
      this.messageService.add({
        key: 'toast2',
        severity: 'warn',
        summary: 'Champ vide',
        detail: 'Veuillez entrer votre nom',
      });
      this.isSubmitted = false;
      return;
    }
  }

  RegisterProcess() {
    this.messageService.add({
      key: 'toast2',
      severity: 'warn',
      summary: 'Champ vide',
      detail: 'Veuillez entrer votre nom',
    });
    this.isSubmitted = false;
    if (this.applyForme.value.nom != '') {

    } else {
      this.messageService.add({
        key: 'toast2',
        severity: 'warn',
        summary: 'Champ vide',
        detail: 'Veuillez entrer votre nom',
      });
      this.isSubmitted = false;
      return;
    }
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
