import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { StockItemsService } from 'src/app/services/stock-items.service';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.page.html',
  styleUrls: ['./add-item-modal.page.scss'],
})
export class AddItemModalPage implements OnInit {
  stockItemCollection: any;
  noItemData: any;
  data: any = "";

  constructor(private modalCtrl: ModalController, private stockItemsService: StockItemsService, private userProfileService: UserProfileService) { }

  async ngOnInit() {
    this.stockItemsService.getStockItems().subscribe(res => {
      this.stockItemCollection = res;
      this.data = this.stockItemCollection;
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
    console.log(item);
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
