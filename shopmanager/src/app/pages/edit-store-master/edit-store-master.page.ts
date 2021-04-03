import { ToastController } from '@ionic/angular';
import { StoreMasterService } from './../../services/store-master.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-edit-store-master',
  templateUrl: './edit-store-master.page.html',
  styleUrls: ['./edit-store-master.page.scss'],
})
export class EditStoreMasterPage implements OnInit {
  editStoreMasterForm: FormGroup;
  storeDetail: any;
  storeId: any;
  userList: any;

  customActionSheetOptions: any = {
    header: 'Select User'
  };

  constructor(private formbuilder: FormBuilder,private toastController: ToastController, private userProfileService: UserProfileService, private route: ActivatedRoute, private storeMasterService: StoreMasterService, private router: Router) {
    this.storeId = this.route.snapshot.paramMap.get('id');

    this.editStoreMasterForm = this.formbuilder.group({
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
    this.storeDetail = this.storeMasterService.getStoreMasterDetail(this.storeId).onSnapshot((storeInfo) => {
      let value = storeInfo.data();
      this.editStoreMasterForm = this.formbuilder.group({
        storeCode: value.storeCode,
        name: value.name,
        address: value.address,
        userResponsible: value.userResponsible
      });
    });
  }

  async editStoreMaster(value) {
    this.editStoreMasterForm = this.formbuilder.group({
      storeCode: value.storeCode,
      name: value.name,
      address: value.address,
      userResponsible: value.userResponsible
    });
    this.storeMasterService.editStoreMaster(this.storeId, this.editStoreMasterForm.value);
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Store Profile Updated Successfully!',
      animated: true,
      mode: "ios"
    });
    await toast.present();
    this.router.navigateByUrl('/store-master');
  }

}
