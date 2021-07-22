import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { StockItemsService } from 'src/app/services/stock-items.service';
import { StoreMasterService } from 'src/app/services/store-master.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.page.html',
  styleUrls: ['./add-item-modal.page.scss'],
})
export class AddItemModalPage implements OnInit {
  stockItemCollection: any;
  noItemData: any;
  data: any;
  db = firebase.default.firestore();

  constructor(private modalCtrl: ModalController, private storeMasterService: StoreMasterService, private stockItemsService: StockItemsService, private userProfileService: UserProfileService) { }

  async ngOnInit() {
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

  dismissModal() {
    this.modalCtrl.dismiss(null, 'cancel');
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

  ionViewWillEnter() {
    setTimeout(() => {
      this.noItemData = "NO ITEM AVAILABLE!"
    }, 3000);
  }

  selectedItem(item) {
    let selectedItem = {
      itemCode: item.itemCode,
      itemName: item.itemName,
      rate: item.sellingPrice,
      qty: 1,
      totalQtyPrice: 1 * item.sellingPrice,
    }

    this.modalCtrl.dismiss(selectedItem, 'Item  Selected');
  }
}
