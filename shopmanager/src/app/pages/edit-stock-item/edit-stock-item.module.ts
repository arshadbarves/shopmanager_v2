import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditStockItemPageRoutingModule } from './edit-stock-item-routing.module';

import { EditStockItemPage } from './edit-stock-item.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditStockItemPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [EditStockItemPage]
})
export class EditStockItemPageModule { }
