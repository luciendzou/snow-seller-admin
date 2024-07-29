
import { AddApprovComponent } from './approv/add-approv/add-approv.component';
import { ApprovComponent } from './approv/approv.component';
import { ViewApprovComponent } from './approv/view-approv/view-approv.component';
import { LoginpageComponent } from './auth/loginpage/loginpage.component';
import { RegisterpageComponent } from './auth/registerpage/registerpage.component';
import { AddSubCategoriesComponent } from './categories/add-sub-categories/add-sub-categories.component';
import { AddSupCategoriesComponent } from './categories/add-sup-categories/add-sup-categories.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './categories/sub-categories/sub-categories.component';
import { SupCategoriesComponent } from './categories/sup-categories/sup-categories.component';
import { UpdateSubCategoriesComponent } from './categories/update-sub-categories/update-sub-categories.component';
import { UpdateSupCategoriesComponent } from './categories/update-sup-categories/update-sup-categories.component';
import { AddCommandeComponent } from './commandes/add-commande/add-commande.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ViewCommandesComponent } from './commandes/view-commandes/view-commandes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { MainComponent } from './main/main.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { StockComponent } from './stock/stock.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: LoadingPageComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'register', component: RegisterpageComponent },
  {
    path: '', component: MainComponent,
    children: [

      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'categories', component: CategoriesComponent,
        children: [
          { path: '', component: SupCategoriesComponent },
          { path: 'create', component: AddSupCategoriesComponent },
          { path: 'sub-categories/:id', component: SubCategoriesComponent },
          { path: 'sub-categories/create', component: AddSubCategoriesComponent },
          { path: 'update/:id', component: UpdateSupCategoriesComponent },
          { path: 'sub-categories/:id/create', component: AddSubCategoriesComponent },
          { path: 'sub-categories/:id/update/:id', component: UpdateSubCategoriesComponent },
        ]

      },
      {
        path: 'providers-stock', component: ApprovComponent,
        children: [
          { path: '', component: ViewApprovComponent },
          { path: 'create', component: AddApprovComponent },
        ]
      },
      { path: 'approv-stock', component: CommandesComponent,
        children:[
          { path: '', component: ViewCommandesComponent },
          { path: 'add/:id', component: AddCommandeComponent },
        ]
       },
      { path: 'update-stock', component: StockComponent },
      { path: 'promotions', component: PromotionsComponent },
    ]
  },

  /* { path: 'modules', component: ModulesComponent },
  { path: 'points-ventes', component: ZonesComponent },
  { path: 'unites', component: UnitsComponent },
  { path: 'shop-plans', component: ShopPlansComponent },
  { path: 'settings', component: SettingsComponent }, */];
