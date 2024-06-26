import { UserProfileService } from './user-profile.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class StoreMasterService {
  storeMasterCollection: AngularFirestoreCollection;
  storeMasterInfo: any;
  editstoreMasterInfo: any;
  userInfo: any;
  db = firebase.default.firestore();

  constructor(private fireStore: AngularFirestore, private userProfileService: UserProfileService) {
  }

  getStoreMaster() {
    this.storeMasterCollection = this.fireStore.collection('storeMasterList');
    return this.storeMasterCollection.valueChanges({ idField: 'id' });
  }

  deleteStoreMaster(storeMasterId) {
    this.fireStore.collection('storeMasterList').doc(storeMasterId).delete();
  }

  addStoreMaster(storeMasterInfoDetail) {
    this.storeMasterInfo = this.fireStore.collection('storeMasterList').doc((storeMasterInfoDetail.storeCode).toString());
    this.storeMasterInfo.set({
      storeCode: storeMasterInfoDetail.storeCode,
      name: storeMasterInfoDetail.name,
      address: storeMasterInfoDetail.address,
      userResponsible: storeMasterInfoDetail.userResponsible
    });
  }

  editStoreMaster(storeMasterId, storeMasterInfoDetail) {
    this.editstoreMasterInfo = this.fireStore.collection('storeMasterList').doc(storeMasterId);
    this.editstoreMasterInfo.update({
      storeCode: storeMasterInfoDetail.storeCode,
      name: storeMasterInfoDetail.name,
      address: storeMasterInfoDetail.address,
      userResponsible: storeMasterInfoDetail.userResponsible
    });
  }

  getStoreMasterDetail(storeMasterId) {
    return this.db.collection('storeMasterList').doc(storeMasterId);
  }

  async getCurrentUserStore() {
    let currentUsertoreCode;
    this.userInfo = await this.userProfileService.getCurrentUserInfoLocal();
    await this.db.collection('storeMasterList').where('userResponsible', '==', this.userInfo.email).get().then((snapShot) => {
      snapShot.docs.forEach(res => {
        currentUsertoreCode = res.data().storeCode;
      })
    });
    return currentUsertoreCode;

  }
}
