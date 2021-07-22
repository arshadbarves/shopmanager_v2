import { NavigationExtras, Router } from '@angular/router';
import { UserProfileService } from './../../services/user-profile.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StockItemsService } from 'src/app/services/stock-items.service';
import { StoreMasterService } from 'src/app/services/store-master.service';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  stockItemCollection: any;
  noItemData: any;
  result: any;
  data: any = "";

  db = firebase.default.firestore();

  constructor(private alertController: AlertController, private stockItemsService: StockItemsService, public router: Router, private storeMasterService: StoreMasterService, private userProfileService: UserProfileService) {

  }

  ngOnInit() {

    this.storeMasterService.getCurrentUserStore().then(async (res) => {

      let storeCode = res
      await this.stockItemsService.getStockItems().subscribe(res => {
        let itemsInfo = [];

        for (let i = 0; i < res.length; i++) {

          let itemInfo = res[i];
          this.db.collection('itemList').doc((res[i].itemCode).toString()).collection('storeAssignment').where('storeCode', '==', storeCode).onSnapshot(res => {
            res.forEach(res => {
              itemInfo.storeAssignment = res.data();
              itemsInfo.push(itemInfo);
            });
          });
        }
        this.data = itemsInfo;
        this.stockItemCollection = itemsInfo;
      });

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
            console.log(item);
            this.stockItemsService.deleteStockItem(item.id);
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

  async ionViewWillEnter() {
    setTimeout(() => {
      this.noItemData = "NO ITEM AVAILABLE!"
    }, 3000);
  }
}
