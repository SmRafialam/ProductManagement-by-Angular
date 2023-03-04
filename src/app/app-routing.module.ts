import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AttributesComponent } from './collections/attributes/attributes.component';
import { CategoriesComponent } from './collections/categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from './guard/authguard.guard';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path:'dashboard', component:DashboardComponent, canActivate:[AuthguardGuard]},
  { path:'collections/attributes', component:AttributesComponent, canActivate:[AuthguardGuard]},
  { path:'collections/categories', component:CategoriesComponent, canActivate:[AuthguardGuard]},
  { path: '**', component: DashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
