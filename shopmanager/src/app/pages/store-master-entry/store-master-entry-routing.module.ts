import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreMasterEntryPage } from './store-master-entry.page';

const routes: Routes = [
  {
    path: '',
    component: StoreMasterEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreMasterEntryPageRoutingModule {}
