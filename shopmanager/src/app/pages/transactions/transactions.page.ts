import { UserProfileService } from 'src/app/services/user-profile.service';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  currentUserInfo: any;
  transactionList: any;
  currentUserStore: any;
  noItemData: any;

  db = firebase.default.firestore();

  constructor(private transactionService: TransactionService, private router: Router, private userProfileService: UserProfileService) {
  }

  async ngOnInit() {
    this.currentUserInfo = await this.userProfileService.getCurrentUserInfoLocal();
    this.db.collection('storeMasterList').where('userResponsible', '==', this.currentUserInfo.email).get().then((snapShot) => {
      snapShot.docs.forEach(res => {
        this.currentUserStore = res.data().storeCode;
        this.transactionService.getTransaction(this.currentUserStore).get().then((snapShot) => {
          this.transactionList = snapShot.docs;
        });
      })
    });
  }

  transactionNav(transactionInfo) {
    let navigationExtras: NavigationExtras = {
      state: {
        transactionDetailInfo: {
          id: transactionInfo.id,
          detail: transactionInfo.data()
        }
      }
    }
    this.router.navigate(['transaction-details'], navigationExtras);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.noItemData = "NO STORE MASTER AVAILABLE!"
    }, 3000);
  }
}
