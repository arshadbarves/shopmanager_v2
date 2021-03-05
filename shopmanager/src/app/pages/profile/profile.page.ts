import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private route: Router, private Auth: AuthService) { }

  ngOnInit() {
  }


  async logout() {
    await this.Auth.usersignout();
    this.route.navigateByUrl('/');
  }
}
