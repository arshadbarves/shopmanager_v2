import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditItemQtyModalPageRoutingModule } from './edit-item-qty-modal-routing.module';

import { EditItemQtyModalPage } from './edit-item-qty-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditItemQtyModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditItemQtyModalPage]
})
export class EditItemQtyModalPageModule { }
