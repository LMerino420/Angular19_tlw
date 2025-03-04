import { Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegistComponent } from './auth/regist/regist.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'regist', component: RegistComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
];
