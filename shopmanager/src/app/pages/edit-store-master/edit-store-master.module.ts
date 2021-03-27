import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditStoreMasterPageRoutingModule } from './edit-store-master-routing.module';

import { EditStoreMasterPage } from './edit-store-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditStoreMasterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditStoreMasterPage]
})
export class EditStoreMasterPageModule {}
