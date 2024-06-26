import { ToastController } from '@ionic/angular';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockItemsService } from 'src/app/services/stock-items.service';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-edit-stock-item',
  templateUrl: './edit-stock-item.page.html',
  styleUrls: ['./edit-stock-item.page.scss'],
})
export class EditStockItemPage implements OnInit {
  editItemForm: FormGroup;
  itemSellingPrice: any;
  itemDetail: any;
  itemID: any;

  constructor(private formbuilder: FormBuilder, private toastController: ToastController, private userProfileService: UserProfileService, private route: ActivatedRoute, private stockItemsService: StockItemsService, private router: Router) {
    this.itemID = this.route.snapshot.paramMap.get('id');

    this.editItemForm = this.formbuilder.group({
      itemCode: [''],
      itemName: [''],
      purchasePrice: [''],
      tax: [''],
      expense: [''],
      sellingPrice: [''],
      quantity: [''],
      dateOfPurchase: [''],
      billReference: ['']
    });
  }

  async ngOnInit() {
    this.itemDetail = this.stockItemsService.getItem(this.itemID).onSnapshot((itemInfo) => {
      let value = itemInfo.data();
      this.editItemForm = this.formbuilder.group({
        itemCode: value.itemCode,
        itemName: value.itemName,
        purchasePrice: value.purchasePrice,
        tax: value.tax,
        expense: value.expense,
        sellingPrice: value.sellingPrice,
        quantity: value.quantity,
        dateOfPurchase: new Date(value.dateOfPurchase.seconds * 1000).toDateString(),
        billReference: value.billReference
      });
    });
  }

  async editItem(value) {
    this.editItemForm = this.formbuilder.group({
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
    this.stockItemsService.editStockItem(this.itemID, this.editItemForm.value);
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Item Updated Successfully!',
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
    this.editItemForm = this.formbuilder.group({
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
