import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackandService, Response } from '@backand/angular2-sdk'
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

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
  //public keuze = { gebruikersnaam: true, email: false};

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService, public storage: Storage, private toastCtrl: ToastController) {
    this.gebruiker = { gebruikersId: null, gebruikersnaam: "", wachtwoord: "", email: "", voornaam: "", achternaam: "" };
    //  this.gebruikers = this.gebruiker;

  }

 // gebruikers = {}
  logForm() {
    console.log(this.gebruiker)

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

    this.backand.object.create('Gebruiker', this.gebruiker)
      .then((res: any) => {
        console.log("res " + res.status);
        if (res.status == 500) {
          toastSuccesful.present();
        }
      },
      (err: any) => {
        console.log("err " + err);
        toastError.present();

      });
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
      console.log(value.achternaam);
        }
      })
      .catch(error => { })

 
    
 
   // console.log(this.gebruikerslijst[0].email);

  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
