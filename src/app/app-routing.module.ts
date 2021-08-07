import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path: 'account', loadChildren: () => import('./feature/account/account.module').then(mod => mod.AccountModule) },
  { path: 'shop', loadChildren: () => import('./feature/shop/shop.module').then(mod => mod.ShopModule) },
  { path: 'basket', loadChildren: () => import('./feature/basket/basket.module').then(mod => mod.BasketModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
