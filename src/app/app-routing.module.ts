import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { RegisterformComponent } from './components/registerform/registerform.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent,canActivate:[AuthGuardGuard]},
  { path: 'productdetail/:id', component: ProductdetailComponent },
  { path: 'cart', component: CartComponent,canActivate:[AuthGuardGuard]},
  {path:'login',component:LoginformComponent},
  {path:'register',component:RegisterformComponent},
  { path: '**', component: PagenotfoundComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
