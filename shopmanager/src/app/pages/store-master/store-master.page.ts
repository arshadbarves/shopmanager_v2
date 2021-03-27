import { StoreMasterService } from './../../services/store-master.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-store-master',
  templateUrl: './store-master.page.html',
  styleUrls: ['./store-master.page.scss'],
})
export class StoreMasterPage implements OnInit {
  storeMasterCollection: any;
  noItemData: any;
  uid: any;

  constructor(private alertController: AlertController,private storeMasterService: StoreMasterService, public navCtrl: NavController, private userProfileService: UserProfileService) { }

  async ngOnInit() {
    this.uid = await this.userProfileService.getUserUID();
    this.storeMasterService.getStoreMaster(this.uid).subscribe(res => {
      this.storeMasterCollection = res;
      console.log(res);
    });
  }

  async deleteStoreMasterDetail(item) {
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
            this.storeMasterService.deleteStoreMaster(this.uid, item.id);
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
      this.noItemData = "NO STORE MASTER AVAILABLE!"
    }, 5000);
  }
}
