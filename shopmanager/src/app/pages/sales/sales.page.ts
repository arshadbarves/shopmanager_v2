import { StockItemsService } from 'src/app/services/stock-items.service';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { SalesService } from './../../services/sales.service';
import { EditItemQtyModalPage } from './../edit-item-qty-modal/edit-item-qty-modal.page';
import { AddItemModalPage } from './../add-item-modal/add-item-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  itemList: any = [];
  billCollection: any;
  currentUserInfo: any;
  db = firebase.default.firestore();
  currentUserStore: any;
  previousBillNumber: any;

  constructor(public modalController: ModalController, private stockItemsService: StockItemsService, private router: Router, private userProfileService: UserProfileService, private salesService: SalesService) { }

  async ngOnInit() {
    this.currentUserInfo = await this.userProfileService.getCurrentUserInfoLocal();
    this.db.collection('storeMasterList').where('userResponsible', '==', this.currentUserInfo.email).get().then((snapShot) => {
      snapShot.docs.forEach(res => {
        this.currentUserStore = res.data().storeCode;
      })
    });
    await this.db.collection('billingProfile').orderBy("transcationDateTime", "desc").limit(1).get().then(snapShot => {
      snapShot.docs.forEach(res => {
        this.previousBillNumber = res.id;
      });
    });
  }

  async AddModal() {
    const modal = await this.modalController.create({
      component: AddItemModalPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data != null) {
      this.itemList.push(data);
    }
  }

  async EditModal(item) {
    const modal = await this.modalController.create({
      component: EditItemQtyModalPage,
      componentProps: { id: item.id, name: item.itemName, quantity: item.qty, price: item.rate }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data != null) {
      let index = this.itemList.indexOf(item);
      this.itemList[index].qty = data.qty;
      this.itemList[index].totalQtyPrice = data.totalPriceCal;

    }
  }

  removeItem(item) {
    let index = this.itemList.indexOf(item);
    this.itemList.splice(index, 1);
  }

  collectCash() {

    if (!this.previousBillNumber) {
      this.previousBillNumber = 0;
    }
    this.billCollection = {
      totalCollectedAmount: this.totalCollectedAmount(),
      user: this.currentUserInfo.email,
      storeCode: this.currentUserStore,
      items: this.itemList,
      lastbillNumber: parseInt(this.previousBillNumber, 10)
    }

    this.salesService.addBilling(this.billCollection);
    this.stockItemsService.updateStockItemBilling(this.billCollection)
    this.router.navigateByUrl('/');
  }

  totalCollectedAmount() {
    let totalTemp = 0;
    for (let i = 0; i < this.itemList.length; i++) {
      totalTemp += this.itemList[i].totalQtyPrice;
    }
    return totalTemp;
  }
}
