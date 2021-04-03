import { ToastController } from '@ionic/angular';
import { StoreMasterService } from './../../services/store-master.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-store-master-entry',
  templateUrl: './store-master-entry.page.html',
  styleUrls: ['./store-master-entry.page.scss'],
})
export class StoreMasterEntryPage implements OnInit {
  addStoreMasterForm: FormGroup;
  itemSellingPrice: any;
  userList: any;

  customActionSheetOptions: any = {
    header: 'Select User'
  };

  constructor(private formbuilder: FormBuilder, private toastController: ToastController, private storeMasterService: StoreMasterService, private router: Router, private userProfileService: UserProfileService) {
    this.addStoreMasterForm = this.formbuilder.group({
      storeCode: [''],
      name: [''],
      address: [''],
      userResponsible: ['']
    });
  }

  async ngOnInit() {
    this.userProfileService.getAllUsers().subscribe(res => {
      this.userList = res;
    });
  }

  async addStoreMaster(value) {
    this.addStoreMasterForm = this.formbuilder.group({
      storeCode: value.storeCode,
      name: value.name,
      address: value.address,
      userResponsible: value.userResponsible
    });
    this.storeMasterService.addStoreMaster(this.addStoreMasterForm.value);
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Store Profile Added Successfully!',
      animated: true,
      mode: "ios"
    });
    await toast.present();
    this.router.navigateByUrl('/store-master');
  }

}
