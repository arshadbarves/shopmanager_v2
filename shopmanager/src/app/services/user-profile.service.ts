import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  userProfilInfo: any;
  uid: any;
  db = firebase.default.firestore()
  constructor(private fireStore: AngularFirestore) { }

  addUserInfo(uid, userInfo) {
    this.userProfilInfo = this.fireStore.collection('userProfile').doc(uid);
    this.userProfilInfo.set({
      fullName: userInfo.displayName,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber
    });
  }

  async getUserUID() {
    this.uid = await Storage.get({ key: 'UID' });
    return this.uid.value;
  }

  setUserUID(uid) {
    Storage.set({
      key: 'UID',
      value: uid
    });
  }

  removeUserUID() {
    Storage.remove({ key: 'UID' });
  }

  getUserInfo(uid) {
    return this.db.collection('userProfile').doc(uid);
  }
}
