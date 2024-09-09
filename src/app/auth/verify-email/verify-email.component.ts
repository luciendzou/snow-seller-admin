import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SuperAdmin } from '../../domains/super-admin';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ToastModule,],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
  providers: [MessageService, AuthService],
})
export class VerifyEmailComponent {
  continuous: boolean = false;
  email: any;
  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private LocalStorage: BrowserStorageService
  ) { }

  ngOnInit(): void {

    if (this.authService.isLoggedIn) {

      if (this.authService.checkEmailVerification) {
        this.continuous = false;
        this.router.navigate(["/verify-email-address"]);
      }

      this.continuous = true;
      this.router.navigate(["/save-data"]);
    }
    const user = JSON.parse(this.LocalStorage.get('user')!);
    if (user != null) {
      this.email = user.email;
    }else{
      this.email = this.LocalStorage.get('email');
    }

  }
}
