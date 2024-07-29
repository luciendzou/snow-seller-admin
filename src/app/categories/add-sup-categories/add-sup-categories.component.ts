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
  isloading:boolean=false;


  applyForm = new FormGroup({
    categorie: new FormControl(''),
    description: new FormControl(''),
    statut: new FormControl(''),
  });


  constructor(private router: Router, private messageService: MessageService, private AuthService : AuthService, private categorieService : CategoriesService) { }

  ngOnInit() {

  }



  submitApplication() {
    this.isloading=true;
    this.categorieService.setCategorieToApi(
      this.applyForm.value.categorie ?? '',
      this.applyForm.value.description ?? '',
      this.applyForm.value.statut ?? 'not-active',
      this.selectedImage
    ).subscribe((res:any)=>{
      if (!res.error && res) {
        this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Catégorie ajoutée avec succès.' });
        this.isloading=false;
        this.router.navigate(['categories'])
      } else {
        if (res.error.statut == 'error') {
          this.messageService.add({ key: 'toast2', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          this.isloading=false;
          return;
        }
        if (res.error.statut == 'errorstatement') {
          this.isloading=false;
          this.messageService.add({ key: 'toast2', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          return;
        }
      }
    })
  }


  onSelectImage(event: any) {
    this.selectedImage = event.srcElement.files[0];

    const reader = new FileReader(); reader.onload = e => {
      return this.link = reader.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }
}
