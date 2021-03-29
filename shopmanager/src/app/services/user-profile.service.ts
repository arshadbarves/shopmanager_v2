import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import * as firebase from 'firebase';
import { userInfo } from 'os';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  userProfilInfo: any;
  uid: any;
  currentUserInfo: any;
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

  storeUserInfoLocal(uid, userInfo) {
    Storage.set({
      key: 'userInfo',
      value: JSON.stringify({
        UID: uid,
        fullName: userInfo.displayName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber
      })
    });
  }

  removeUser() {
    Storage.remove({ key: 'UID' });
    Storage.remove({ key: 'userInfo' });
  }

  getUserInfo(uid) {
    return this.db.collection('userProfile').doc(uid);
  }

  async getCurrentUserInfo() {
    this.currentUserInfo = await Storage.get({ key: 'userInfo' });
    return JSON.parse(this.currentUserInfo.value);
  }

  getAllUsers() {
    let userList = this.fireStore.collection('userProfile');
    return userList.valueChanges();
  }
}
