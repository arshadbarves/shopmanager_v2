import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoveStockItemPage } from './move-stock-item.page';

const routes: Routes = [
  {
    path: '',
    component: MoveStockItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoveStockItemPageRoutingModule {}
