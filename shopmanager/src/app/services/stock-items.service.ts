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



    this.stockItemsCollection = this.fireStore.collection('itemList');
    return this.stockItemsCollection.valueChanges();

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
        availableQty: firebase.default.firestore.FieldValue.increment(-item.qty),
      });
    });
  }
}
