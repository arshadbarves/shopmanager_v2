import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoveStockItemPageRoutingModule } from './move-stock-item-routing.module';

import { MoveStockItemPage } from './move-stock-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoveStockItemPageRoutingModule
  ],
  declarations: [MoveStockItemPage]
})
export class MoveStockItemPageModule { }
