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

  removeUser() {
    Storage.remove({ key: 'UID' });
  }

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
