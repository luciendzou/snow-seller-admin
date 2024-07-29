import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
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
    ToastModule
  ],
  templateUrl: './add-sub-categories.component.html',
  styleUrl: './add-sub-categories.component.css',
  providers: [MessageService],
})
export class AddSubCategoriesComponent implements OnInit{
  route: ActivatedRoute = inject(ActivatedRoute);
  value: string | undefined;
  CategorieId!:number;

  isLoading : boolean = false;

  applyForm = new FormGroup({
    categorie: new FormControl(''),
    description: new FormControl(''),
    statut: new FormControl(''),
  });

  constructor(private router: Router, private messageService: MessageService, private authService : AuthService, private sousCategorieService : SouscategoriesService){
    this.CategorieId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {

  }


  submitApplication() {
    this.isLoading = true;
      this.sousCategorieService.setCategorieToApi(
        this.applyForm.value.categorie ?? '',
        this.applyForm.value.statut  ?? '',
        this.CategorieId
      ).subscribe((res:any)=>{
        if (!res.error && res) {
          this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Catégorie ajoutée avec succès.' });
          this.router.navigate(['categories/sub-categories/'+this.CategorieId]);
          this.isLoading = false;
        } else {
          if (res.error.statut == 'error') {
            this.messageService.add({ key: 'toast2', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
            this.isLoading = false
            return;
          }
          if (res.error.statut == 'errorstatement') {
            this.messageService.add({ key: 'toast2', severity: res.error.statut, summary: 'Erreur', detail: res.error.message });
            this.isLoading = false
            return;
          }
        }

      });
  }
}
