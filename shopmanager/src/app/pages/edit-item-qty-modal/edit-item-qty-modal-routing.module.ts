import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditItemQtyModalPage } from './edit-item-qty-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditItemQtyModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditItemQtyModalPageRoutingModule {}
