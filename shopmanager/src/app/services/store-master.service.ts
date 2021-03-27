import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserProfileService } from './user-profile.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class StoreMasterService {
  storeMasterCollection: AngularFirestoreCollection;
  storeMasterInfo: any;
  editstoreMasterInfo: any;
  db = firebase.default.firestore();

  constructor(private fireStore: AngularFirestore, private userProfileService: UserProfileService) {

   }

  getStoreMaster(uid) {
    this.storeMasterCollection = this.fireStore.collection('userProfile').doc(uid).collection('storeMasterList');
    return this.storeMasterCollection.valueChanges({ idField: 'id' });
  }

  deleteStoreMaster(uid, storeMasterId) {
    this.fireStore.collection('userProfile').doc(uid).collection('storeMasterList').doc(storeMasterId).delete();
  }

  addStoreMaster(uid, storeMasterInfoDetail) {
    this.storeMasterInfo = this.fireStore.collection('userProfile').doc(uid).collection('storeMasterList');
    this.storeMasterInfo.add({
      storeCode: storeMasterInfoDetail.storeCode,
      name: storeMasterInfoDetail.name,
      address: storeMasterInfoDetail.address,
      userResponsible: storeMasterInfoDetail.userResponsible
    });
  }

  editStoreMaster(uid, storeMasterId, storeMasterInfoDetail) {
    this.editstoreMasterInfo = this.fireStore.collection('userProfile').doc(uid).collection('storeMasterList').doc(storeMasterId);
    this.editstoreMasterInfo.update({
      storeCode: storeMasterInfoDetail.storeCode,
      name: storeMasterInfoDetail.name,
      address: storeMasterInfoDetail.address,
      userResponsible: storeMasterInfoDetail.userResponsible
    });
  }

  getStoreMasterDetail(uid, storeMasterId) {
    return this.db.collection('userProfile').doc(uid).collection('storeMasterList').doc(storeMasterId);
  }
}
