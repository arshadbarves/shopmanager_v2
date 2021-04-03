import { UserProfileService } from './../../services/user-profile.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {
  validationUserMessage = {
    email: [
      { type: 'required', message: 'Please Enter your Email Address' },
      { type: 'pattern', message: 'Please Enter valid Email Address' }
    ],
    password: [
      { type: 'required', message: 'Please enter your Password!' },
      { type: 'minlength', message: 'The Password must be atleast 6 characters or more' }
    ]
  };
  validationFormUser: FormGroup;
  loading: any;

  // tslint:disable-next-line: max-line-length
  constructor(public formbuilder: FormBuilder, private userProfileService: UserProfileService, public authservice: AuthService, private router: Router, public loadingController: LoadingController, public alertController: AlertController, public navCtrl: NavController) {
    this.loading = this.loadingController;
  }

  ngOnInit() {
    this.validationFormUser = this.formbuilder.group({
      email: new FormControl('test@admin.com', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('asdf1234', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  LoginUser(value) {
    this.showalert();
    try {
      this.authservice.loginFireauth(value).then(resp => {
        this.loading.dismiss();

        this.router.navigate(['tabs']);
        this.authservice.userLogIn();
      }, error => {
        this.loading.dismiss();
        this.errorLoading(error.message);
      });
    }
    catch (err) {
      console.log(err);
    }
  }


  async errorLoading(message: any) {
    const loading = await this.alertController.create({
      header: 'Error!',
      message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.navigateBack(['loginscreen']);
        }
      }]
    });
    await loading.present();
  }
  async showalert() {
    const load = await this.loadingController.create({
      message: 'Please wait...',
    });
    await load.present();
  }
}
