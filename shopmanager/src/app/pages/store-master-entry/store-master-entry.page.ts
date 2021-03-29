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
  uid: any;
  userList: any;

  customActionSheetOptions: any = {
    header: 'Select User'
  };

  constructor(private formbuilder: FormBuilder, private storeMasterService: StoreMasterService, private router: Router, private userProfileService: UserProfileService) {
    this.addStoreMasterForm = this.formbuilder.group({
      storeCode: [''],
      name: [''],
      address: [''],
      userResponsible: ['']
    });
  }

  async ngOnInit() {
    this.uid = await this.userProfileService.getUserUID();
    this.userProfileService.getAllUsers().subscribe(res => {
      this.userList = res;
    });
  }

  addStoreMaster(value) {
    this.addStoreMasterForm = this.formbuilder.group({
      storeCode: value.storeCode,
      name: value.name,
      address: value.address,
      userResponsible: value.userResponsible
    });
    this.storeMasterService.addStoreMaster(this.addStoreMasterForm.value);
    this.router.navigateByUrl('/store-master');
  }

}
