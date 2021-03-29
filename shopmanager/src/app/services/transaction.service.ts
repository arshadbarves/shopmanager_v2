import { async } from '@angular/core/testing';
import { StoreMasterService } from './store-master.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionDetail: any;
  updatetransactionDetail: any;
  currentUserInfo: any;
  currentUserStore: any;
  db = firebase.default.firestore();

  constructor(private fireStore: AngularFirestore, private userProfileService: UserProfileService, private storeMasterService: StoreMasterService) {
  }

  RequestToMove(storeMasterInfoDetail) {
    this.transactionDetail = this.fireStore.collection('transactions');
    this.transactionDetail.add({
      itemCode: storeMasterInfoDetail.itemCode,
      itemName: storeMasterInfoDetail.itemName,
      fromStore: storeMasterInfoDetail.fromStore,
      toStore: storeMasterInfoDetail.toStore,
      qtyRequested: storeMasterInfoDetail.qtyRequested,
      qtyAvailable: storeMasterInfoDetail.qtyAvailability,
      status: "Requested",
      itemId: storeMasterInfoDetail.itemId,
      requestedUser: storeMasterInfoDetail.email,
      requestedDate: firebase.default.firestore.Timestamp.fromDate(new Date()).toDate(),
      acceptedByUser: null,
      acceptedDate: null,
      qtyAccepted: null
    });
  }

  getTransaction(storeCode) {
    return this.db.collection('transactions').where('toStore', '==', storeCode).where('status', '==', 'Requested');
  }

  getTransactionDetail(transactionsId) {
    return this.db.collection('transactions').doc(transactionsId);
  }

  updateTransaction(email, transactionInfo) {
    this.updatetransactionDetail = this.fireStore.collection('transactions').doc(transactionInfo.id);
    this.updatetransactionDetail.update({
      status: "Accepted",
      acceptedByUser: email,
      acceptedDate: firebase.default.firestore.Timestamp.fromDate(new Date()).toDate(),
      qtyAccepted: transactionInfo.detail.qtyRequested
    });

  }

}
