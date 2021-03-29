import { TransactionService } from './../../services/transaction.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { StoreMasterService } from './../../services/store-master.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-move-stock-item',
  templateUrl: './move-stock-item.page.html',
  styleUrls: ['./move-stock-item.page.scss'],
})
export class MoveStockItemPage implements OnInit {
  data: any;
  storeList: any;
  selectedStore: any;
  qtyToMove: any;
  currentUserInfo: any;
  transactionInfo: any;

  customActionSheetOptions: any = {
    header: 'Select Store'
  };

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private userProfileService: UserProfileService, public toastController: ToastController, private router: Router, private storeMasterService: StoreMasterService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state.itemInfo;
    }
    this.storeMasterService.getStoreMaster().subscribe(res => {
      this.storeList = res;
    });
  }

  async ngOnInit() {
    this.currentUserInfo = await this.userProfileService.getCurrentUserInfo();
  }

  async requestToMove() {
    if (this.selectedStore && this.qtyToMove) {
      if (this.data.storeAssignment[0].availableQty < this.qtyToMove) {
        const toast = await this.toastController.create({
          color: 'dark',
          duration: 2000,
          message: 'Quantity is Higher the Availability',
          animated: true,
          mode: "ios"
        });

        await toast.present();
      }
      else {
        this.transactionInfo = {
          itemCode: this.data.itemCode,
          itemName: this.data.itemName,
          fromStore: this.data.storeAssignment[0].storeCode,
          toStore: this.selectedStore,
          qtyRequested: this.qtyToMove,
          qtyAvailability: this.data.storeAssignment[0].availableQty,
          email: this.currentUserInfo.email,
          itemId: this.data.id,
        }
        this.transactionService.RequestToMove(this.transactionInfo);
        this.router.navigateByUrl('items');
      }
    }
    else {
      const toast = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'Please fill the required field',
        animated: true,
        mode: "ios"
      });

      await toast.present();
    }
  }

}
