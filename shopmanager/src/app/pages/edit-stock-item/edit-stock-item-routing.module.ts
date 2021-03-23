import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditStockItemPage } from './edit-stock-item.page';

const routes: Routes = [
  {
    path: '',
    component: EditStockItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditStockItemPageRoutingModule {}
