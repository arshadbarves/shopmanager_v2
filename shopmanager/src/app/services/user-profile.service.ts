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
  currentUserInfo: any;
  db = firebase.default.firestore()
  constructor(private fireStore: AngularFirestore) { }

  getUserInfo(uid) {
    return this.db.collection('userProfile').doc(uid);
  }

  async getCurrentUserInfo() {
    let user = firebase.default.auth().currentUser;
    
    if (user != null) {
      this.currentUserInfo = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        uid: user.uid
      }
    }
    return this.currentUserInfo;
  }

  async storeCurrentUserInfo() {
    let userInfo = await this.getCurrentUserInfo();
    await Storage.set({
    key: 'currentUserInfo',
    value: JSON.stringify({
      name: userInfo.name,
      email: userInfo.email,
      uid: userInfo.uid
    })
  });
  }

  removeCurrentUserInfo() {
    Storage.remove({ key: 'currentUserInfo' });
  }

  async getCurrentUserInfoLocal() {
    const ret = await Storage.get({ key: 'currentUserInfo' });
    return JSON.parse(ret.value);
}

  getAllUsers() {
    let userList = this.fireStore.collection('userProfile');
    return userList.valueChanges();
  }

  updateProfile(userUpdateProfileInfo) {
    firebase.default.auth().currentUser.updateProfile({
      displayName: userUpdateProfileInfo.name
    });
  }
}
