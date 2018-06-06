import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import * as $ from 'jquery'
import { MenuPage } from '../menu/menu';
import { User } from '../../models/User';
import { Guuid } from '../../models/Guuid';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Toast } from '../../Helper/Toast';
import { Http } from '@angular/http';
import { LoginController } from '../../api/LoginController';
import { Loading } from '../../Helper/Loading';
import { LocalStorage } from '../../Helper/LocalStorage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{
  private user: User;
  private currentUser: User;
  private token: string;
  private repeat: string;
  private signUpForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public http: Http) {
    this.user = { userId: null, firstname: "", lastname: "", mail: "", password: "", token: "" };
    this.repeat = "";
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signUpForm = formBuilder.group({
      mail: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(EMAILPATTERN), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      firstname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });
    this.currentUser = LocalStorage.currentUser;
    if (this.currentUser == null || this.currentUser.token == null) {
      this.currentUser = { userId: null, firstname: "", lastname: "", mail: "", password: "", token: "" };
      console.log("switch login");
      this.switchLogin();
    } else {
      console.log("switch logout");
      this.switchLogout();
    }

    if (this.currentUser.mail == null) {
      this.currentUser.mail = " ";
    }
  }
 
  createAccount() {
    if (this.user.password != this.repeat) {
      Toast.toastPasswordsNotMatch(this.toastCtrl);
    }else if (this.signUpForm.valid) {
      var i = LoginController.createLogin(this.http, this.user, this.loadingCtrl, this.toastCtrl);
        this.switchLogin();
    } 
   }

  login() {
      LoginController.checkLogin(this.http, this.user, this.loadingCtrl, this.toastCtrl, this.storage, this.navCtrl);
   }

  logout() {
     this.user = { userId: null, firstname: "", lastname: "", mail: "", password: "", token: ""};
     LocalStorage.deleteUserAndToken(this.storage);
     this.switchLogin();
   }
  
   switchCreate() {
     $(".aanmelding").css('display', 'block');
     $(".login").css('display', 'none');
     $(".logout").css('display', 'none');

   }

   switchLogin() {
     $(document).ready(function () {
     $(".aanmelding").css('display', 'none' );
     $(".login").css('display', 'block');
     $(".logout").css('display', 'none');
     });
   }

   switchLogout() {
     $(document).ready(function () {
     $(".login").css('display', 'none');
     $(".aanmelding").css('display', 'none');
     $(".logout").css('display', 'block');
     });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

