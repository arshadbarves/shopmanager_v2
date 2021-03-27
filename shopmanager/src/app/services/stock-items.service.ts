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

  getStockItems(uid) {
    this.stockItemsCollection = this.fireStore.collection('userProfile').doc(uid).collection('itemList');
    return this.stockItemsCollection.valueChanges({ idField: 'id' });
  }

  deleteStockItem(uid, itemId) {
    this.fireStore.collection('userProfile').doc(uid).collection('itemList').doc(itemId).delete();
  }

  addStockItem(uid, itemInfoDetail) {
    this.itemInfo = this.fireStore.collection('userProfile').doc(uid).collection('itemList');
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

  editStockItem(uid, itemID, itemInfoDetail) {
    this.itemInfo = this.fireStore.collection('userProfile').doc(uid).collection('itemList').doc(itemID);
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

  getItem(uid, itemID) {
    return this.db.collection('userProfile').doc(uid).collection('itemList').doc(itemID);
  }
}
