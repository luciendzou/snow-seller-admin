import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Categories } from '../../domains/categories';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-sup-categories',
  standalone: true,
  imports: [
    CheckboxModule,
    InputTextModule,
    NgbModule,
    CommonModule,
    TooltipModule,
    FileUploadModule,
    ButtonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ToastModule,
    NgbModule,
    RouterLink
  ],
  templateUrl: './add-sup-categories.component.html',
  styleUrl: './add-sup-categories.component.css',
  providers: [MessageService],
})
export class AddSupCategoriesComponent implements OnInit {

  user_id: any;
  categorie: Categories | undefined;
  selectedImage: any;
  link: any;
  isloading: boolean = false;


  applyForm = new FormGroup({
    categorie: new FormControl(''),
    description: new FormControl(''),
  });


  constructor( private storage: AngularFireStorage, private LocalStorage: BrowserStorageService, private router: Router, private messageService: MessageService, private authService: AuthService, private categorieService: CategoriesService) { }

  ngOnInit() {

  }



  submitApplication() {
    this.isloading = true;
    var link = '';

    const basePath = '/Admin/Categories/' + this.selectedImage.name;
    const storageRef = this.storage.ref(basePath);
    const uploadTask = this.storage.upload(basePath, this.selectedImage);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL : any) => {
         link = downloadURL;
         this.categorieService.setCategorieToApi(
          this.applyForm.value.categorie ?? '',
          this.applyForm.value.description ?? '',
          link
        ).then((e) => {
          this.isloading = false;
          this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Catégorie ajoutée avec succès.' });
          this.isloading = false;
          this.router.navigate(['categories'])
          return;
        }).catch((error) => {
          this.isloading = false;
          this.router.navigate(['categories'])
          this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Erreur', detail: error.message });
          return;
        });
        });
      })
    ).subscribe();
  }




  onSelectImage(event: any) {
    this.selectedImage = event.srcElement.files[0];

    const reader = new FileReader(); reader.onload = e => {
      return this.link = reader.result;
    };
    reader.readAsDataURL(this.selectedImage);

  }
}
