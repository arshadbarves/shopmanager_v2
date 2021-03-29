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

  constructor(private route: ActivatedRoute, private userProfileService: UserProfileService, private transactionService: TransactionService, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.transactionDetailsInfo = this.router.getCurrentNavigation().extras.state.transactionDetailInfo;
      this.transactionDetails = this.transactionDetailsInfo.detail;
    }
  }

  async ngOnInit() {
    this.currentUserInfo = await this.userProfileService.getCurrentUserInfo();
  }

  acceptRequest() {
    this.transactionService.updateTransaction(this.currentUserInfo.email, this.transactionDetailsInfo);
    this.router.navigateByUrl('/');
  }

}
