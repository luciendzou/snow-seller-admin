import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FournisseursService } from '../../services/fournisseurs.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { AuthService } from '../../services/auth.service';

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
  });

  selectedImage: any;
  link: any;
  linkers: any;
  isLoading: boolean = false;
  label:any;

  constructor(
    private authService: AuthService,
    private providerService: FournisseursService,
    private messageService: MessageService,
    private router: Router,
    private storage: AngularFireStorage,
    private LocalStorage: BrowserStorageService
  ) {
    //this.linker = this.LocalStorage.get('imageLink');
    this.LocalStorage.remove('imageLink');
    console.log(this.LocalStorage.get('imageLink'));
  }

  ngOnInit(): void {
    this.label='Commencer'
  }

  submitApplication() {
    this.label='Ajouter une marques'
    this.isLoading = true;
    var linker = this.LocalStorage.get('imageLink');
    this.authService.saveFileInFirebase('Marques/', this.selectedImage);
    linker = this.LocalStorage.get('imageLink');
    if (linker == '' || linker == null) {
      linker = this.LocalStorage.get('imageLink');
      if (linker == '' || linker == null) {
        this.isLoading = false;
        return;
      }
      this.providerService
        .setFournisseurToApi(
          this.applyForm.value.provider ?? '',
          linker
        ).then((e) => {
          this.isLoading = false;
          this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'La marque a été ajoutée avec succès.' });

          this.LocalStorage.remove('imageLink')
          this.router.navigate(['providers-stock'])
          return;
        }).catch((error) => {
          this.isLoading = false;
          this.LocalStorage.remove('imageLink')
          this.router.navigate(['providers-stock'])
          this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Erreur', detail: error.message });
          return;
        });
    } else {
      linker = this.LocalStorage.get('imageLink');

      this.providerService
        .setFournisseurToApi(
          this.applyForm.value.provider ?? '',
          linker
        ).then((e) => {
          this.isLoading = false;
          this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'La marque a été ajoutée avec succès.' });

          this.LocalStorage.remove('imageLink')
          this.router.navigate(['providers-stock'])
          return;
        }).catch((error) => {
          this.isLoading = false;
          this.LocalStorage.remove('imageLink')
          this.router.navigate(['providers-stock'])
          this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Erreur', detail: error.message });
          return;
        });
    }
  }



  onSelectImage(event: any) {
    this.selectedImage = event.srcElement.files[0];

    const reader = new FileReader(); reader.onload = e => {
      return this.link = reader.result;
    };
    reader.readAsDataURL(this.selectedImage);

  }
}
