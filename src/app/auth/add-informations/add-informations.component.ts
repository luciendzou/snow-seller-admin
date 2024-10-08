import { User } from './../../domains/superadmin';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SuperAdmin } from '../../domains/super-admin';
import { CommonModule } from '@angular/common';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-informations',
  standalone: true,
  imports: [
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    RippleModule,
    ToastModule,
    NgbModule,
    CommonModule],
  templateUrl: './add-informations.component.html',
  styleUrl: './add-informations.component.css',
  providers: [MessageService, AuthService],
})
export class AddInformationsComponent {

  superadmin: any;
  isSubmitted: boolean = false;
  selectedImage: any;
  link: any;
  user:any;

  first: boolean = true;
  second: boolean = false;

  applyForm = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    entreprise: new FormControl(''),
    telephone: new FormControl(''),
    logo: new FormControl(''),
    nui: new FormControl(''),
    detail_entreprise: new FormControl(''),
    sigle: new FormControl(''),
  });

  constructor(
    private storage: AngularFireStorage,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private LocalStorage: BrowserStorageService
  ) {
    this.superadmin = new SuperAdmin();
    this.user = JSON.parse(this.LocalStorage.get('user')!);
  }

  ngOnInit(): void {
    this.authService.getUsersCount(this.user.uid);
  }


  AddingProcess() {
    this.isSubmitted = true;
    console.log(this.LocalStorage.get('imageLink'));
    var linker = this.LocalStorage.get('imageLink');

      this.authService.saveFileInFirebase('Logo/', this.selectedImage);

      while (linker == '') {
        console.log(this.LocalStorage.get('imageLink'));

        linker = this.LocalStorage.get('imageLink');
      }
      console.log(linker);
      this.LocalStorage.remove('imageLink')


      if (this.applyForm.value.nom != '') {
        if (this.applyForm.value.prenom != '') {
          if (this.applyForm.value.entreprise != '') {
            if (this.applyForm.value.telephone != '') {
              if (this.applyForm.value.nui != '') {
                if (this.applyForm.value.sigle != '') {
                  if (this.applyForm.value.detail_entreprise != '') {
                    if (linker != null) {
                      this.superadmin = {
                        uid: this.user.uid,
                        email: this.user.email,
                        name: this.applyForm.value.nom ?? '' + this.applyForm.value.prenom ?? '',
                        password: this.user.password,
                        logo: linker,
                        telephone: this.applyForm.value.telephone ?? '',
                        entreprise: this.applyForm.value.entreprise ?? '',
                        detail_entreprise: this.applyForm.value.detail_entreprise ?? '',
                        nui: this.applyForm.value.nui ?? '',
                        sigle: this.applyForm.value.sigle ?? '',
                      };
                      this.authService.SetUserData(this.superadmin);
                      this.isSubmitted = false;
                      this.LocalStorage.remove('Linkimage')!;

                      this.router.navigate(['dashboard']);
                    } else {
                      this.messageService.add({
                        key: 'toast2',
                        severity: 'warn',
                        summary: 'Champ vide',
                        detail: 'Veuillez entrer votre logo',
                      });
                      this.isSubmitted = false;
                      return;
                    }
                  } else {
                    this.messageService.add({
                      key: 'toast2',
                      severity: 'warn',
                      summary: 'Champ vide',
                      detail: "Veuillez entrer une description de l'entreprise",
                    });
                    this.isSubmitted = false;
                    return;
                  }
                } else {
                  this.messageService.add({
                    key: 'toast2',
                    severity: 'warn',
                    summary: 'Champ vide',
                    detail: 'Veuillez entrer votre sigle',
                  });
                  this.isSubmitted = false;
                  return;
                }
              } else {
                this.messageService.add({
                  key: 'toast2',
                  severity: 'warn',
                  summary: 'Champ vide',
                  detail: "Veuillez entrer votre Numéro d'identifiant unique",
                });
                this.isSubmitted = false;
                return;
              }
            } else {
              this.messageService.add({
                key: 'toast2',
                severity: 'warn',
                summary: 'Champ vide',
                detail: 'Veuillez entrer votre numéro de telephone',
              });
              this.isSubmitted = false;
              return;
            }
          } else {
            this.messageService.add({
              key: 'toast2',
              severity: 'warn',
              summary: 'Champ vide',
              detail: "Veuillez entrer votre nom de 'entreprise",
            });
            this.isSubmitted = false;
            return;
          }
        } else {
          this.messageService.add({
            key: 'toast2',
            severity: 'warn',
            summary: 'Champ vide',
            detail: 'Veuillez entrer votre prenom',
          });
          this.isSubmitted = false;
          return;
        }
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

  NextPage() {
    this.first = !this.first;
    this.second = !this.second;
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
