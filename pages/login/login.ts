import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BackandService, Response } from '@backand/angular2-sdk'
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import * as $ from 'jquery'
import { MenuPage } from '../menu/menu';

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
  public gebruikerslijst: Gebruiker[] = [];
  private gebruiker: Gebruiker;
  private remember: Boolean;
  private storageUsername: string;
  private storagePassword: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService, public storage: Storage, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {

    this.gebruiker = { gebruikersId: null, gebruikersnaam: "", wachtwoord: "", email: "", voornaam: "", achternaam: "" };
    this.remember = true;
    storage.get('storageUsername').then((val) => {
      this.storageUsername = val;
      this.gebruiker.gebruikersnaam = val;
    });
    storage.get('storagePassword').then((val) => {
      this.storagePassword = val;
      this.gebruiker.wachtwoord = val;
    });

    
  }
 
   createAccount() {
     console.log(this.gebruiker);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

      this.backand.object.create('Gebruiker', this.gebruiker)
      .then((res: any) => {
        console.log("res " + res.status);
        if (res.status == "200") {
          loading.dismiss()
          toastSuccesful.present();
          $(".aanmelding").css('display', 'none');
          $(".login").css('display', 'block');

        }
      },
      (err: any) => {
        console.log("err " + err);
        toastError.present();
        });


    let toastSuccesful = this.toastCtrl.create({
      message: 'Account successfully created',
      duration: 3000,
      position: 'top'
    });

    let toastError = this.toastCtrl.create({
      message: 'Account creation failed: username or email already exists',
      duration: 3000,
      position: 'top'
    });

  }

   login() {
     var succesful: Boolean;
     succesful = false;
     let loading = this.loadingCtrl.create({
       content: 'Please wait...'
     });
     loading.present();

     


    /* NativeStorage.setItem('loginname', this.gebruiker.gebruikersnaam)
       .then(() => console.log('Stored Login Data!'), error => console.error('Error storing LoginData', error));
NativeStorage.getItem('loginname').then( data => this.name = data, console.error('Error getting LoginData', error));


*/

     // voor login get gebruikers 
     this.backand.object.getList("Gebruiker", {
       "pageSize": 21,
       "pageNumber": 1,
       "filter": [],
       "sort": []
     })
       .then((res: any) => {
         this.gebruikerslijst = res.data;
         console.log("gebruikers loaded");

         for (var value of this.gebruikerslijst) {
           if (value.gebruikersnaam == this.gebruiker.gebruikersnaam && value.wachtwoord == this.gebruiker.wachtwoord) {
             loading.dismiss();
             toastSuccesful.present();
             succesful = true;

             if (this.remember) {
               console.log("remember");
               this.storage.set("storageUsername", this.gebruiker.gebruikersnaam);
               this.storage.set("storagePassword", this.gebruiker.wachtwoord);
             } else {
               this.storage.set("storageUsername", null);
               this.storage.set("storagePassword", null);
             }

             this.navCtrl.setRoot(MenuPage);
           }
         }

         if (succesful == false) {
           toastError.present();
         }
       })
       .catch(error => { })


     let toastSuccesful = this.toastCtrl.create({
       message: 'Welcome',
       duration: 3000,
       position: 'top'
     });

     let toastError = this.toastCtrl.create({
       message: 'Username or password is not correct',
       duration: 3000,
       position: 'top'
     });
   }

   switchCreate() {
     $(".aanmelding").css('display', 'block');
     $(".login").css('display', 'none');
   }

   switchLogin() {
     $(".aanmelding").css('display', 'none');
     $(".login").css('display', 'block');
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    $(".aanmelding").css('display', 'none');
    $(".login").css('display', 'block');
  }


 

}

class Gebruiker {
  //field 
  gebruikersId: number;
  gebruikersnaam: string;
  wachtwoord: string;
  email: string;
  voornaam: string;
  achternaam: string;

  //constructor 
  constructor(gebruikersId: number, gebruikersnaam: string, wachtwoord:string, email: string, voornaam: string, achternaam:string) {
    this.gebruikersId = gebruikersId;
    this.gebruikersnaam = gebruikersnaam;
    this.wachtwoord = wachtwoord;
    this.email = email;
    this.voornaam = voornaam;
    this.achternaam = achternaam;
  }

}
