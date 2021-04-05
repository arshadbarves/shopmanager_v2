import { StoreMasterService } from './store-master.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class StockItemsService {

  stockItemsCollection: AngularFirestoreCollection;
  itemDetailInfo: any;
  db = firebase.default.firestore();

  constructor(private fireStore: AngularFirestore, private storeMasterService: StoreMasterService, private userProfileService: UserProfileService) {

  }

  getStockItems() {

    let itemsInfo = [];
    this.storeMasterService.getCurrentUserStore().then(
      res => {
        let storeCode = res;
        this.stockItemsCollection = this.fireStore.collection('itemList');
        this.stockItemsCollection.valueChanges().forEach(res => {
          for (let i = 0; i < res.length; i++) {

            let itemInfo = res[i];
            this.db.collection('itemList').doc((res[i].itemCode).toString()).collection('storeAssignment').where('storeCode', '==', storeCode).onSnapshot(res => {
              res.forEach(res => {
                itemInfo.storeAssignment = res.data();
                itemsInfo.push(itemInfo);
              });
            });
          }
        });
      }
    );
    return itemsInfo;
  }

  deleteStockItem(itemId) {
    this.fireStore.collection('itemList').doc(itemId).delete();
  }

  addStockItem(itemInfoDetail) {
    let itemInfo = this.fireStore.collection('itemList').doc((itemInfoDetail.itemCode).toString());
    itemInfo.set({
      itemCode: itemInfoDetail.itemCode,
      itemName: itemInfoDetail.itemName,
      purchasePrice: itemInfoDetail.purchasePrice,
      tax: itemInfoDetail.tax,
      expense: itemInfoDetail.expense,
      sellingPrice: itemInfoDetail.sellingPrice,
      quantity: itemInfoDetail.quantity,
      dateOfPurchase: firebase.default.firestore.Timestamp.fromDate(new Date(itemInfoDetail.dateOfPurchase)).toDate(),
      billReference: itemInfoDetail.billReference
    });
    itemInfo.collection('storeAssignment').doc('home').set({
      assignedQty: itemInfoDetail.quantity,
      availableQty: itemInfoDetail.quantity,
      storeCode: "home"
    })
  }

  editStockItem(itemID, itemInfoDetail) {
    let itemInfo = this.fireStore.collection('itemList').doc(itemID);
    itemInfo.update({
      itemCode: itemInfoDetail.itemCode,
      itemName: itemInfoDetail.itemName,
      purchasePrice: itemInfoDetail.purchasePrice,
      tax: itemInfoDetail.tax,
      expense: itemInfoDetail.expense,
      sellingPrice: itemInfoDetail.sellingPrice,
      quantity: itemInfoDetail.quantity,
      dateOfPurchase: firebase.default.firestore.Timestamp.fromDate(new Date(itemInfoDetail.dateOfPurchase)).toDate(),
      billReference: itemInfoDetail.billReference
    });
  }

  getItem(itemID) {
    return this.db.collection('itemList').doc(itemID);
  }

  updateStockItem(itemInfoDetail) {

    let itemInfo = this.db.collection('itemList').doc(itemInfoDetail.detail.itemCode);

    itemInfo.collection('storeAssignment').doc('home').update({
      availableQty: firebase.default.firestore.FieldValue.increment(-itemInfoDetail.detail.qtyRequested)
    });

    itemInfo.collection('storeAssignment').doc((itemInfoDetail.detail.toStore).toString()).set({
      assignedQty: firebase.default.firestore.FieldValue.increment(itemInfoDetail.detail.qtyRequested),
      availableQty: firebase.default.firestore.FieldValue.increment(itemInfoDetail.detail.qtyRequested),
      storeCode: itemInfoDetail.detail.toStore
    }, { merge: true });
  }

  updateStockItemBilling(itemInfoDetail) {
    itemInfoDetail.items.forEach(item => {
      let itemInfo = this.db.collection('itemList').doc(item.itemCode);

      itemInfo.update({
        quantity: firebase.default.firestore.FieldValue.increment(-item.qty)
      });

      itemInfo.collection('storeAssignment').doc((itemInfoDetail.storeCode).toString()).update({
        assignedQty: firebase.default.firestore.FieldValue.increment(-item.qty),
        availableQty: firebase.default.firestore.FieldValue.increment(-item.qty),
      });
    });
  }
}
