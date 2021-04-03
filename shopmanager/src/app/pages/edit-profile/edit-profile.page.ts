import { UserProfileService } from 'src/app/services/user-profile.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profileFormMessages = {
    name: [{ type: 'required', message: 'Please Enter your Full Name' }]
  };
  userProfile: any;
  profileForm: FormGroup;

  constructor(private formbuilder: FormBuilder, private toastController: ToastController, private userProfileService: UserProfileService, private router: Router) {
    this.profileForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  async ngOnInit() {
    this.userProfile = await this.userProfileService.getCurrentUserInfo();
    this.profileForm = this.formbuilder.group({
      name: new FormControl(this.userProfile.name, Validators.compose([
        Validators.required
      ])),
      email: new FormControl(this.userProfile.email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  async updateUserProfile(userProfileInfo) {
    this.userProfileService.updateProfile(userProfileInfo);
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Profile updated successfully!',
      animated: true,
      mode: "ios"
    });
    await toast.present();
    this.router.navigateByUrl('/tabs/tabs/profile');
  }
}
