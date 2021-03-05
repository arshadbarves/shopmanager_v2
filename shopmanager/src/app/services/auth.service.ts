import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private route: Router) { }

  loginFireauth(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        error => reject(error)
      );
    });
  }

  userRegistration(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        error => reject(error)
      );
    });
  }

  usersignout() {
    console.log("User Logout");
    return this.auth.signOut();
  }
}
