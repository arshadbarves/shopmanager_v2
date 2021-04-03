import { ToastController } from '@ionic/angular';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StockItemsService } from 'src/app/services/stock-items.service';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.page.html',
  styleUrls: ['./item-entry.page.scss'],
})
export class ItemEntryPage implements OnInit {
  addItemForm: FormGroup;
  itemSellingPrice: any;

  constructor(private formbuilder: FormBuilder, private toastController: ToastController, private stockItemsService: StockItemsService, private router: Router, private userProfileService: UserProfileService) {
    this.addItemForm = this.formbuilder.group({
      itemCode: [''],
      itemName: [''],
      purchasePrice: [''],
      tax: [''],
      expense: [''],
      sellingPrice: [this.itemSellingPrice],
      quantity: [''],
      dateOfPurchase: [''],
      billReference: ['']
    });
  }

  ngOnInit() {
  }

  async addItem(value) {
    this.addItemForm = this.formbuilder.group({
      itemCode: value.itemCode,
      itemName: value.itemName,
      purchasePrice: value.purchasePrice,
      tax: value.tax,
      expense: value.expense,
      sellingPrice: value.sellingPrice,
      quantity: value.quantity,
      dateOfPurchase: value.dateOfPurchase,
      billReference: value.billReference
    });
    this.stockItemsService.addStockItem(this.addItemForm.value);
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Item Added Successfully!',
      animated: true,
      mode: "ios"
    });
    await toast.present();
    this.router.navigateByUrl('/items');
  }

  calculateSellingPrice(value) {
    var Tax = value.tax;
    var Expense = value.expense;
    var PurchasePrice = value.purchasePrice;
    this.itemSellingPrice = PurchasePrice + ((Tax / 100) * PurchasePrice) + ((Expense / 100) * PurchasePrice) + ((20 / 100) * PurchasePrice);
    this.addItemForm = this.formbuilder.group({
      itemCode: [value.itemCode],
      itemName: [value.itemName],
      purchasePrice: [value.purchasePrice],
      tax: [value.tax],
      expense: [value.expense],
      sellingPrice: [this.itemSellingPrice],
      quantity: [value.quantity],
      dateOfPurchase: [value.dateOfPurchase],
      billReference: [value.billReference]
    });
  }

}
