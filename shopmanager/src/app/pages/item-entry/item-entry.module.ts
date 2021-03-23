import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemEntryPageRoutingModule } from './item-entry-routing.module';

import { ItemEntryPage } from './item-entry.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemEntryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ItemEntryPage]
})
export class ItemEntryPageModule { }
