import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SouscategoriesService } from '../../services/souscategories.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-add-sub-categories',
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
  templateUrl: './add-sub-categories.component.html',
  styleUrl: './add-sub-categories.component.css',
  providers: [MessageService],
})
export class AddSubCategoriesComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  value: string | undefined;
  CategorieId!: number;

  selectedImage: any;
  link: any;
  isloading: boolean = false;

  applyForm = new FormGroup({
    categorie: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private storage: AngularFireStorage, private router: Router, private messageService: MessageService, private authService: AuthService, private sousCategorieService: SouscategoriesService) {
    this.CategorieId = this.route.snapshot.params['id'];
  }

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
        storageRef.getDownloadURL().subscribe((downloadURL: any) => {
          link = downloadURL;
          this.sousCategorieService.setCategorieToApi(
            this.applyForm.value.categorie ?? '',
            this.applyForm.value.description ?? '',
            link,
            this.CategorieId,
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
