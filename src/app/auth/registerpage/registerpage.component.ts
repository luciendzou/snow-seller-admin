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
    NgbModule
  ],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css',
  providers: [MessageService],
})
export class RegisterpageComponent {
  superadmin!: SuperAdmin;

  isSubmitted: boolean = false;

  applyForm = new FormGroup({
    telephone: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private messageService: MessageService, private router: Router, RegisterService : AuthService) {
    this.superadmin = new SuperAdmin();
  }

  RegisterProcess(){}

}
