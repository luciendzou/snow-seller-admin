import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriesService } from '../../services/categories.service';
import { AuthService } from '../../services/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-update-sup-categories',
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
    ToastModule
  ],
  templateUrl: './update-sup-categories.component.html',
  styleUrl: './update-sup-categories.component.css',
  providers: [MessageService],
})
export class UpdateSupCategoriesComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);

  selectedImage: any;
  link: any;
  CategorieId!: number;
  categories!:string;
  isLoading:boolean=false;

  applyForm = new FormGroup({
    categorie: new FormControl(''),
    description: new FormControl(''),
    statut: new FormControl(''),
  });


  constructor(private router: Router, private messageService: MessageService, private categorieService :CategoriesService, private AuthService : AuthService) {
    this.CategorieId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.categorieService.getOneCategories(this.CategorieId).subscribe((res: any) => {

      if (!res.error && res) {
        this.link = res.data[0].image;
        this.categories = res.data[0].name_cat;

        this.applyForm.setValue({
          categorie: res.data[0].name_cat,
          description: res.data[0].description_cat,
          statut: res.data[0].statut
        })
      }

    })

  }

  BactToCategories(){
    this.router.navigate(['categories'])
  }



  submitApplication() {
    this.isLoading = true;
    if (this.applyForm.value.categorie == '') { }
    if (this.applyForm.value.description != '') { }
    if (this.applyForm.value.statut != '') { }

    this.categorieService.updateCategorieToApi(
      this.applyForm.value.categorie ?? '',
      this.applyForm.value.description ?? '',
      this.applyForm.value.statut ?? 'not-active',
      this.selectedImage,
      this.link,
      this.CategorieId
    ).subscribe((res: any) => {
      if (!res.error && res) {
        this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Catégorie modifiée avec succès.' });
        this.isLoading = false;
        this.router.navigate(['categories'])
      } else {
        if (res.error.statut == 'error') {
          this.messageService.add({ key: 'toast2', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          this.isLoading = false;
          return;
        }
        if (res.error.statut == 'errorstatement') {
          this.messageService.add({ key: 'toast2', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
          this.isLoading = false;
          return;
        }
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
