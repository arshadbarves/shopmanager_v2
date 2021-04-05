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
    this.userProfile = await this.userProfileService.getCurrentUserInfo();
  }

  async logout() {
    await this.Auth.userLogOut();
    this.userProfileService.removeCurrentUserInfo();
    this.route.navigateByUrl('/');
  }
}
