import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Categories } from '../../domains/categories';
import { Router } from '@angular/router';
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
    NgbModule
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


  constructor(private LocalStorage: BrowserStorageService, private router: Router, private messageService: MessageService, private authService: AuthService, private categorieService: CategoriesService) { }

  ngOnInit() {

  }



  submitApplication() {
    this.isloading = true;
    var link = '';
    this.authService.saveFileInFirebase('Categories/', this.selectedImage).subscribe((e) => {
      if (e == 100) {
        link = this.LocalStorage.get('Linkimage')!;
        this.categorieService.setCategorieToApi(
          this.applyForm.value.categorie ?? '',
          this.applyForm.value.description ?? '',
          link
        ).then((e) => {
          this.isloading = false;
          this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Catégorie ajoutée avec succès.' });
          this.isloading = false;
          this.LocalStorage.remove('Linkimage')!;
          this.router.navigate(['categories'])
        }).catch((error) => {
          this.isloading = false;
          this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Erreur', detail: error.message });
        });
      }

    });
  }




  onSelectImage(event: any) {
    this.selectedImage = event.srcElement.files[0];

    const reader = new FileReader(); reader.onload = e => {
      return this.link = reader.result;
    };
    reader.readAsDataURL(this.selectedImage);

  }
}
