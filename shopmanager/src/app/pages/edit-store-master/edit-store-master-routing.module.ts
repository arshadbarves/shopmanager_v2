import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditStoreMasterPage } from './edit-store-master.page';

const routes: Routes = [
  {
    path: '',
    component: EditStoreMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditStoreMasterPageRoutingModule {}
