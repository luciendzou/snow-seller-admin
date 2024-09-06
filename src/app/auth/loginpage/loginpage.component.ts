import {
  afterNextRender,
  afterRender,
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuperAdmin } from '../../domains/super-admin';
import { AuthService, errorMessage } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
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
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',
})
export class LoginpageComponent {
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
    private authService: AuthService
  ) {
    this.superadmin = new SuperAdmin();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  LoginProcess() {
    this.isSubmitted = true;
    if (this.applyForm.value.email != '') {
      if (this.applyForm.value.password != '') {
        this.authService
          .loginUser(
            this.applyForm.value.email ?? '',
            this.applyForm.value.password ?? ''
          ).then((user) => {
              this.messageService.add({
                key: 'toast2',
                severity: 'success',
                summary: 'Connexion établie',
                detail: 'Utilisateur connecté avec succès.',
              });
              this.router.navigate(['/dashboard']);
              this.isSubmitted = false;

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
