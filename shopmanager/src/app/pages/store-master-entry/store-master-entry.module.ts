import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreMasterEntryPageRoutingModule } from './store-master-entry-routing.module';

import { StoreMasterEntryPage } from './store-master-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreMasterEntryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StoreMasterEntryPage]
})
export class StoreMasterEntryPageModule {}
