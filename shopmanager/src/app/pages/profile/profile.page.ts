import { Observable } from 'rxjs';
import { UserProfileService } from './../../services/user-profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: any;
  uid: any;
  constructor(private route: Router, private Auth: AuthService, private userProfileService: UserProfileService) { }

  async ngOnInit() {
    this.uid = await this.userProfileService.getUserUID();
    this.userProfileService.getUserInfo(this.uid).onSnapshot((res) => {
      this.userProfile = {
        fullName: res.data().fullName,
        email: res.data().email,
      };
      console.log(this.userProfile);

    })
  }


  async logout() {
    await this.Auth.userLogOut();
    this.userProfileService.removeUser();
    this.route.navigateByUrl('/');
  }
}
