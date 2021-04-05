import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  billInfo: any;
  db = firebase.default.firestore();

  constructor(private fireStore: AngularFirestore) {

  }
  addBilling(billCollection) {
    var dateObj = new Date();
    var month = ("0" + (dateObj.getMonth() + 1).toString()).substr(-2);
    var day = ("0" + dateObj.getUTCDate().toString()).substr(-2);
    var year = dateObj.getFullYear().toString().substr(-1);

    let billData = year + month + day;
    this.billInfo = this.fireStore.collection('billingProfile').doc((billCollection.lastbillNumber + 1).toString());
    this.billInfo.set({
      billDate: billData,
      billNumber: billCollection.lastbillNumber + 1,
      transcationDateTime: firebase.default.firestore.Timestamp.fromDate(new Date()).toDate(),
      user: billCollection.user,
      storeCode: billCollection.storeCode,
      totalCollectedAmount: billCollection.totalCollectedAmount,
      items: billCollection.items
    });
  }
}
