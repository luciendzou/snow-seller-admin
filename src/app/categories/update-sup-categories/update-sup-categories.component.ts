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
import { BrowserStorageService } from '../../services/browser-storage.service';
import { error } from 'console';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
  categories!: string;
  isLoading: boolean = false;

  applyForm = new FormGroup({
    categorie: new FormControl(''),
    description: new FormControl(''),
    statut: new FormControl(''),
  });


  constructor(private storage: AngularFireStorage, private router: Router, private messageService: MessageService, private categorieService: CategoriesService, private authService: AuthService, private LocalStorage: BrowserStorageService,) {
    this.CategorieId = this.route.snapshot.params['id'];
  }

  ngOnInit() {

    this.categorieService.getOneCategories(this.CategorieId).then((res: any) => {
      this.link = res.imgCat;
      this.categories = res.nameCat;
      this.applyForm.setValue({
        categorie: res.nameCat,
        description: res.description_cat,
        statut: res.actived
      })
    })

  }

  BactToCategories() {
    this.router.navigate(['categories'])
  }



  submitApplication() {
    this.isLoading = true;
    if (this.applyForm.value.categorie == '') { }
    if (this.applyForm.value.description != '') { }
    if (this.applyForm.value.statut != '') { }

    var linker = '';

    if (this.selectedImage !== undefined) {
      console.log('Started here');
      const basePath = '/Admin/Categories/' + this.selectedImage.name;
      const storageRef = this.storage.ref(basePath);
      const uploadTask = this.storage.upload(basePath, this.selectedImage);
      console.log('Good');
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          console.log('Good 1');
          storageRef.getDownloadURL().subscribe((downloadURL: any) => {
            linker = downloadURL;
            console.log(linker);
            this.categorieService.updateCategorieToApi(
              this.applyForm.value.categorie ?? '',
              this.applyForm.value.description ?? '',
              JSON.parse(this.applyForm.value.statut ?? 'false'),
              linker,
              this.CategorieId
            ).then((res: any) => {
              console.log('Good 2');
              this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Catégorie modifiée avec succès.' });
              this.isLoading = false;
              this.router.navigate(['categories'])
              return;
            }).catch((error) => {
              this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Erreur', detail: error.message });
              this.isLoading = false;
              return;
            });
          })
        }));
    } else {
      console.log('Started on this');
      this.categorieService.updateCategorieToApi(
        this.applyForm.value.categorie ?? '',
        this.applyForm.value.description ?? '',
        JSON.parse(this.applyForm.value.statut ?? 'false'),
        this.link,
        this.CategorieId
      ).then((res: any) => {
        console.log('Okay');
        this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Catégorie modifiée avec succès.' });
        this.isLoading = false;
        this.router.navigate(['categories'])
      }).catch((error) => {
        this.messageService.add({ key: 'toast2', severity: 'error', summary: 'Erreur', detail: error.message });
        this.isLoading = false;
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
