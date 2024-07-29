import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    ToastModule
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

  isLoading : boolean = false;
  applyForm = new FormGroup({
    categorie: new FormControl(''),
    statut: new FormControl(''),
  });

  constructor(private router: Router, private messageService: MessageService, private sousCategorieService : SouscategoriesService) {
    this.CategorieId = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.sousCategorieService.getOneSousCategories(this.CategorieId).subscribe((res: any) => {

      if (!res.error && res) {

        this.applyForm.setValue({
          categorie: res.data[0].name_cat,
          statut: res.data[0].statut,
        })

        this.SupCategorieId = res.data[0].cat_id
      }

    })
  }

  submitApplication() {
    this.isLoading = true;
    if (this.applyForm.value.categorie == '') { }
    if (this.applyForm.value.statut != '') { }

    this.sousCategorieService.updateSousCategorieToApi(
      this.applyForm.value.categorie ?? '',
      this.applyForm.value.statut ?? 'not-active',
      this.CategorieId
    ).subscribe((res: any) => {
      if (!res.error && res) {
        this.messageService.add({ key: 'toast2', severity: 'success', summary: 'Succès', detail: 'Catégorie modifiée avec succès.' });
        this.router.navigate(['categories/sub-categories/'+this.SupCategorieId])
        this.isLoading = false;
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


  BactToCategories(){
    this.router.navigate(['categories/sub-categories/'+this.SupCategorieId])
  }
}
