import { UserProfileService } from './../../services/user-profile.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StockItemsService } from 'src/app/services/stock-items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  stockItemcollection: any;
  noItemData: any;
  uid: any;
  constructor(private stockItemsService: StockItemsService, public navCtrl: NavController, private userProfileService: UserProfileService) {

  }

  async ngOnInit() {
    this.uid = await this.userProfileService.getUserUID();
    this.stockItemsService.getStockItems(this.uid).subscribe(res => {
      this.stockItemcollection = res;
    });
  }

  deleteStockItem(item) {
    this.stockItemsService.deleteStockItem(this.uid, item.id);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.noItemData = "NO ITEM AVAILABLE!"
    }, 5000);
  }
}
