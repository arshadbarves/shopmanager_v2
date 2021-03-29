import { NavigationExtras, Router } from '@angular/router';
import { UserProfileService } from './../../services/user-profile.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StockItemsService } from 'src/app/services/stock-items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  stockItemCollection: any;
  noItemData: any;
  uid: any;
  result: any;
  data: any = "";
  constructor(private alertController: AlertController, private stockItemsService: StockItemsService, public router: Router, private userProfileService: UserProfileService) {

  }

  async ngOnInit() {
    this.uid = await this.userProfileService.getUserUID();
    this.stockItemsService.getStockItems(this.uid).subscribe(res => {
      this.stockItemCollection = res;
      this.data = this.stockItemCollection;
    });
  }

  async searchItem(ev: any) {
    this.data = this.stockItemCollection;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.data = (this.data = this.data.filter((items) => {
        return (items.itemCode.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }));
    }

  }

  async deleteStockItem(item) {
    var alert = await this.alertController.create({
      header: "Delete Confirmation",
      message: "Do you want to delete this item '" + item.itemName + "'",
      backdropDismiss: false,
      animated: true,
      translucent: true,
      buttons: [
        {
          text: "Confirm",
          cssClass: 'secondary',
          handler: () => {
            this.stockItemsService.deleteStockItem(this.uid, item.id);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    alert.present();
  }

  moveStockItem(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        itemInfo: item
      }
    }
    this.router.navigate(['move-stock-item'], navigationExtras);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.noItemData = "NO ITEM AVAILABLE!"
    }, 3000);
  }
}
