import { UserProfileService } from './../../services/user-profile.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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
  constructor(private alertController: AlertController,private stockItemsService: StockItemsService, public navCtrl: NavController, private userProfileService: UserProfileService) {

  }

  async ngOnInit() {
    this.uid = await this.userProfileService.getUserUID();
    this.stockItemsService.getStockItems(this.uid).subscribe(res => {
      this.stockItemCollection = res;
      console.log(res);
    });
  }

  async deleteStockItem(item) {
    var alert = await this.alertController.create({
      header: "Delete Confirmation",
      message: "Do you want to delete this item '" + item.itemName + "'",
      backdropDismiss: false,
      animated: true,
      translucent:true,
      buttons:[
        {
          text:"Confirm",
          cssClass: 'secondary',
          handler: () => {
            this.stockItemsService.deleteStockItem(this.uid, item.id);
          }
        },
        {
          text:"Cancel",
          role:"cancel"
        }
      ]
    });
    alert.present();
    
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.noItemData = "NO ITEM AVAILABLE!"
    }, 5000);
  }
}
