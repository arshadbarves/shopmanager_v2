import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemEntryPage } from './item-entry.page';

const routes: Routes = [
  {
    path: '',
    component: ItemEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemEntryPageRoutingModule {}
