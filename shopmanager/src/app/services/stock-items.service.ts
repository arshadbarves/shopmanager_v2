import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class StockItemsService {

  stockItemsCollection: AngularFirestoreCollection;
  itemInfo: any;
  itemDetailInfo: any;
  db = firebase.default.firestore();

  constructor(private fireStore: AngularFirestore, private userProfileService: UserProfileService) {

  }

  getStockItems() {
    this.stockItemsCollection = this.fireStore.collection('itemList');
    return this.stockItemsCollection.valueChanges({ idField: 'id' });
  }

  deleteStockItem(itemId) {
    this.fireStore.collection('itemList').doc(itemId).delete();
  }

  addStockItem(itemInfoDetail) {
    this.itemInfo = this.fireStore.collection('itemList');
    this.itemInfo.add({
      itemCode: itemInfoDetail.itemCode,
      itemName: itemInfoDetail.itemName,
      purchasePrice: itemInfoDetail.purchasePrice,
      tax: itemInfoDetail.tax,
      expense: itemInfoDetail.expense,
      sellingPrice: itemInfoDetail.sellingPrice,
      quantity: itemInfoDetail.quantity,
      dateOfPurchase: firebase.default.firestore.Timestamp.fromDate(new Date(itemInfoDetail.dateOfPurchase)).toDate(),
      billReference: itemInfoDetail.billReference,
      storeAssignment: [{
        assignedQty: itemInfoDetail.quantity,
        availableQty: itemInfoDetail.quantity,
        storeCode: "home"
      }]
    });
  }

  editStockItem(itemID, itemInfoDetail) {
    this.itemInfo = this.fireStore.collection('itemList').doc(itemID);
    this.itemInfo.update({
      itemCode: itemInfoDetail.itemCode,
      itemName: itemInfoDetail.itemName,
      purchasePrice: itemInfoDetail.purchasePrice,
      tax: itemInfoDetail.tax,
      expense: itemInfoDetail.expense,
      sellingPrice: itemInfoDetail.sellingPrice,
      quantity: itemInfoDetail.quantity,
      dateOfPurchase: firebase.default.firestore.Timestamp.fromDate(new Date(itemInfoDetail.dateOfPurchase)).toDate(),
      billReference: itemInfoDetail.billReference,
      storeAssignment: [{
        assignedQty: itemInfoDetail.quantity,
        availableQty: itemInfoDetail.quantity,
        storeCode: "home"
      }]
    });
  }

  getItem(itemID) {
    return this.db.collection('itemList').doc(itemID);
  }

  updateStockItem(itemID, itemInfoDetail) {

    this.itemInfo = this.db.collection('itemList').doc(itemID);

    this.itemInfo.update({
      storeAssignment: [{
        assignedQty: itemInfoDetail.detail.qtyAvailable,
        availableQty: itemInfoDetail.detail.qtyAvailable - itemInfoDetail.detail.qtyRequested,
        storeCode: "home"
      }]
    });
    this.itemInfo.update({
      storeAssignment: firebase.default.firestore.FieldValue.arrayUnion(
        {
          assignedQty: itemInfoDetail.detail.qtyRequested,
          availableQty: itemInfoDetail.detail.qtyRequested,
          storeCode: itemInfoDetail.detail.toStore
        })
    });
  }
}
