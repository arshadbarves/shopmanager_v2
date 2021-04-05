import { ToastController } from '@ionic/angular';
import { StockItemsService } from './../../services/stock-items.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss'],
})
export class TransactionDetailsPage implements OnInit {
  transactionDetails: any;
  transactionDetailsInfo: any;
  currentUserInfo: any;

  constructor(private route: ActivatedRoute, private toastController: ToastController, private stockItemsService: StockItemsService, private userProfileService: UserProfileService, private transactionService: TransactionService, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.transactionDetailsInfo = this.router.getCurrentNavigation().extras.state.transactionDetailInfo;
      this.transactionDetails = this.transactionDetailsInfo.detail;
    }
  }

  async ngOnInit() {
    this.currentUserInfo = await this.userProfileService.getCurrentUserInfo();
  }

  async acceptRequest() {
    this.transactionService.updateTransaction(this.currentUserInfo.email, this.transactionDetailsInfo);
    this.stockItemsService.updateStockItem(this.transactionDetailsInfo);
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Transaction Accepted Successfully!',
      animated: true,
      mode: "ios"
    });
    await toast.present();
    this.router.navigateByUrl('/');
  }

}
