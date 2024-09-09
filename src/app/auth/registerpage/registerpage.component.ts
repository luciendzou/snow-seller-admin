import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SuperAdmin } from '../../domains/super-admin';
import { Router } from '@angular/router';
import { AuthService, errorMessage } from '../../services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StepperModule } from 'primeng/stepper';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-registerpage',
  standalone: true,
  imports: [
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    RippleModule,
    ToastModule,
    NgbModule,
  ],
  providers: [MessageService, AuthService],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css',
})
export class RegisterpageComponent {
  superadmin!: SuperAdmin;

  isSubmitted: boolean = false;
  logo: string = '';

  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private LocalStorage: BrowserStorageService
  ) {
    this.superadmin = new SuperAdmin();
    if (this.authService.isLoggedIn) {

      if (this.authService.checkEmailVerification) {
        this.router.navigate(["/verify-email-address"]);
      }
    }
  }


  ngOnInit(): void {

  }

  RegisterProcess() {
    this.isSubmitted = true;
    if (this.applyForm.value.email != '') {
      if (this.applyForm.value.password != '') {
        this.authService
          .registerUser(
            this.applyForm.value.email ?? '',
            this.applyForm.value.password ?? ''
          ).then((user) => {
              if (user) {
                this.LocalStorage.set('email', this.applyForm.value.email)
                this.LocalStorage.set('password', this.applyForm.value.password)
                this.isSubmitted = false;
                this.messageService.add({
                  key: 'toast2',
                  severity: 'success',
                  summary: 'Connexion établie',
                  detail: user+' connecté avec succès.',
                });
                this.authService.SendVerificationMail();
              }

          })
          .catch((error) => {
            this.messageService.add({
              key: 'toast2',
              severity: 'error',
              summary: 'Erreur Authentification',
              detail: errorMessage.convertMessage(error.code),
            });
            this.isSubmitted = false;
            return;
          });
      } else {
        this.messageService.add({
          key: 'toast2',
          severity: 'warn',
          summary: 'Champ vide',
          detail: 'Veuillez entrer votre mot de passe',
        });
        this.isSubmitted = false;
        return;
      }
    } else {
      this.messageService.add({
        key: 'toast2',
        severity: 'warn',
        summary: 'Champ vide',
        detail: 'Veuillez entrer votre adresse mail',
      });
      this.isSubmitted = false;
      return;
    }
  }
}
