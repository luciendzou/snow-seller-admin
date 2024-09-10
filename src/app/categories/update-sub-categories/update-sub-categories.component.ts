import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { SouscategoriesService } from '../../services/souscategories.service';
import { CategoriesService } from '../../services/categories.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-sub-categories',
  standalone: true,
  imports: [
    CheckboxModule,
    InputTextModule,
    NgbModule,
    CommonModule,
    TooltipModule,
    DropdownModule,
    FileUploadModule,
    ButtonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ToastModule,
    RouterLink
  ],
  templateUrl: './update-sub-categories.component.html',
  styleUrl: './update-sub-categories.component.css',
  providers: [MessageService],
})
export class UpdateSubCategoriesComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  value: string | undefined;
  CategorieId!: number;
  SupCategorieId: any;
  selectedImage: any;
  link: any;
  categories!: string;

  isLoading : boolean = false;
  applyForm = new FormGroup({
    categorie: new FormControl(''),
    description: new FormControl(''),
    statut: new FormControl(''),
  });

  constructor(
    private router: Router,
    private messageService: MessageService,
    private storage: AngularFireStorage,
    private sousCategorieService : SouscategoriesService,
    private categorieService : CategoriesService) {
    this.CategorieId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.sousCategorieService.getOneCategories(this.CategorieId).then((res: any) => {
      this.link = res.imgCat;
      this.categories = res.nameCat;
      this.SupCategorieId = res.idParent;
      this.applyForm.setValue({
        categorie: res.nameCat,
        description: res.description_cat,
        statut: res.actived
      })
    })

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


  BactToCategories(){
    this.router.navigate(['categories/sub-categories/'+this.SupCategorieId])
  }

  onSelectImage(event: any) {
    this.selectedImage = event.srcElement.files[0];

    const reader = new FileReader(); reader.onload = e => {
      return this.link = reader.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }
}
