import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BackandService, Response } from '@backand/angular2-sdk'
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import * as $ from 'jquery'
import { MenuPage } from '../menu/menu';
import { User } from '../../models/user';
import { Guuid } from '../../models/Guuid';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Toast } from '../../Helper/Toast';
import { Http } from '@angular/http';
import { LoginController } from '../../api/LoginController';
import { Loading } from '../../Helper/Loading';


/*
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{
  private user: User;
  private token: string;
 // private loginForm: FormGroup;
  private signUpForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService,
    public storage: Storage, private toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder, private http: Http) {
    this.user = { userId: null, firstname: "", lastname: "", mail: "", password: "" };
   
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
   // this.signupform = formBuilder.group({
   //   name: ['',Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)],
     // password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
   ///   name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
    //  email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    //});

    this.signUpForm = formBuilder.group({
      mail: ['', Validators.compose([Validators.maxLength(30), Validators.pattern(EMAILPATTERN), Validators.required])],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'), Validators.required])],
      firstname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]

    });


    storage.get('token').then((val) => {
      this.token = val;
      if (val != null) {
         this.switchLogout();
      } else {
        this.switchLogin();
      }
    });
    storage.get('storageUsername').then((val) => {
      this.user.mail = val;
    });
    storage.get('storagePassword').then((val) => {
      this.user.password = val;
    });
    storage.get('firstname').then((val) => {
      this.user.firstname = val;
    });    
  }
 
  createAccount() {
    if (this.signUpForm.valid) {
       LoginController.createLogin(this.http, this.user, this.loadingCtrl, this.toastCtrl);
       this.switchLogin();
    }
   

     /* this.backand.object.create('Gebruiker', this.gebruiker)
      .then((res: any) => {
        console.log("res " + res.status);
        if (res.status == "200") {
          loading.dismiss();
          Toast.toastAccountCreatedSuccessful(this.toastCtrl);
          this.switchLogin();
        }
      },
      (err: any) => {
        console.log("err " + err);
        loading.dismiss();
        Toast.toastAccountNotCreatedSuccessful(this.toastCtrl);
        }); */
   }

  login() {
      LoginController.checkLogin(this.http, this.user, this.loadingCtrl, this.toastCtrl, this.storage, this.navCtrl);
    
     // voor login get gebruikers 
    /* this.backand.object.getList("Gebruiker", {
       "pageSize": 21,
       "pageNumber": 1,
       "filter": [],
       "sort": []
     })
       .then((res: any) => {
         this.gebruikerslijst = res.data;
         console.log("gebruikers loaded");

         for (var value of this.gebruikerslijst) {
           if (value.mail == this.user.mail && value.password == this.user.password) {
             loading.dismiss();
             toastSuccesful.present();
             succesful = true;

             if (this.remember) {
               console.log("remember");
               this.storage.set("storageUsername", this.user.mail);
               this.storage.set("storagePassword", this.user.password);
             } else {
               this.storage.set("storageUsername", null);
               this.storage.set("storagePassword", null);
             }

             this.navCtrl.setRoot(MenuPage);
           }
         }

         if (succesful == false) {
           toastError.present();
           loading.dismiss();
         }
       })
       .catch(error => { })*/
   }

  logout() {
     this.user = { userId: null, firstname: "", lastname: "", mail: "", password: "" };
     this.storage.set("token", null);
     this.storage.set("storageUsername", null);
     this.storage.set("storagePassword", null);
     this.switchLogin();
   }
  
   switchCreate() {
     $(".aanmelding").css('display', 'block');
     $(".login").css('display', 'none');
     $(".logout").css('display', 'none');

   }

   switchLogin() {
     $(".aanmelding").css('display', 'none');
     $(".login").css('display', 'block');
     $(".logout").css('display', 'none');
   }

   switchLogout() {
     $(".aanmelding").css('display', 'none');
     $(".login").css('display', 'none');
     $(".logout").css('display', 'block');
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    $(".aanmelding").css('display', 'none');
    $(".login").css('display', 'block');
  }

}

