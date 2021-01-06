import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  validationUserMessages = {
    names: [{type: 'required', message: 'Please Enter your Full Name'}],
    phone: [{type: 'required', message: 'Please Enter your Phone Number'}],
    email: [
      {type: 'required', message: 'Please Enter your Email Address'},
      {type: 'pattern', message: 'Please Enter valid Email Address'}
    ],
    password: [
      {type: 'required', message: 'Please enter your Password!'},
      {type: 'minlength', message: 'The Password must be atleast 6 characters or more'}
    ]
  };
  validationFormUser: FormGroup;
  loading: any;
  // tslint:disable-next-line: max-line-length
  constructor(private formbuilder: FormBuilder, private authservice: AuthService, private router: Router, public loadingController: LoadingController, public alertController: AlertController, public navCtrl: NavController) {
    this.loading = this.loadingController;
  }

  ngOnInit() {
    this.validationFormUser = this.formbuilder.group({
      names: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  registerUser(value){
    this.showalert();
    try{
      this.authservice.userRegistration(value).then( response => {
      console.log(response);
      if (response.user){
        response.user.updateProfile ({
          displayName: value.names,
          email: value.email,
          phoneNumber: value.phone
        });
        this.loading.dismiss();
        this.router.navigate(['loginscreen']);
      }
    }, error => {
      this.loading.dismiss();
      this.errorLoading(error.message);
    });
    }
    catch (err){
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
          this.navCtrl.navigateBack(['signup']);
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

