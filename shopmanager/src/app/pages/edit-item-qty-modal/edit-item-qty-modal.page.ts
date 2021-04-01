import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-item-qty-modal',
  templateUrl: './edit-item-qty-modal.page.html',
  styleUrls: ['./edit-item-qty-modal.page.scss'],
})
export class EditItemQtyModalPage implements OnInit {
  @Input() name: string;
  @Input() price: number;
  @Input() quantity: number;
  qtyInput = new FormControl('', Validators.required);
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmQty() {
    let editData = {
      qty: this.qtyInput.value,
      totalPriceCal: this.qtyInput.value * this.price
    }
    this.modalCtrl.dismiss(editData, 'quantity');
  }
}
