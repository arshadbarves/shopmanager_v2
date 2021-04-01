import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';


// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);

// Automatically log in users
const redirectLoggedInToHome = () => redirectLoggedInTo(['/tabs']);



const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'loginscreen',
    loadChildren: () => import('./pages/loginscreen/loginscreen.module').then(m => m.LoginscreenPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'item-entry',
    loadChildren: () => import('./pages/item-entry/item-entry.module').then(m => m.ItemEntryPageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./pages/items/items.module').then(m => m.ItemsPageModule)
  },
  {
    path: 'items/:id',
    loadChildren: () => import('./pages/edit-stock-item/edit-stock-item.module').then(m => m.EditStockItemPageModule)
  },
  {
    path: 'store-master',
    loadChildren: () => import('./pages/store-master/store-master.module').then(m => m.StoreMasterPageModule)
  },
  {
    path: 'store-master-entry',
    loadChildren: () => import('./pages/store-master-entry/store-master-entry.module').then(m => m.StoreMasterEntryPageModule)
  },
  {
    path: 'store-master/:id',
    loadChildren: () => import('./pages/edit-store-master/edit-store-master.module').then(m => m.EditStoreMasterPageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsPageModule)
  },
  {
    path: 'move-stock-item',
    loadChildren: () => import('./pages/move-stock-item/move-stock-item.module').then(m => m.MoveStockItemPageModule)
  },
  {
    path: 'transaction-details',
    loadChildren: () => import('./pages/transaction-details/transaction-details.module').then(m => m.TransactionDetailsPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesPageModule)
  },  {
    path: 'add-item-modal',
    loadChildren: () => import('./pages/add-item-modal/add-item-modal.module').then( m => m.AddItemModalPageModule)
  },
  {
    path: 'edit-item-qty-modal',
    loadChildren: () => import('./pages/edit-item-qty-modal/edit-item-qty-modal.module').then( m => m.EditItemQtyModalPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
