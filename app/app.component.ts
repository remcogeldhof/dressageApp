import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { CreateTestPage } from '../pages/create-test/create-test';
import { Events } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map'

import { Punt } from '../models/punt';

@Component({
  selector: 'Dressage App',
  templateUrl: 'app.html'
})
export class MyApp{
  @ViewChild(Nav) nav: Nav;

  public proevenlijst: any[] = [];
  public oefening: any[] = [];
  public oefeningBasis: any[] = [];
  public puntenlijst: Punt[] = [];
  public gebruikerslijst: any[] = [];

  rootPage: any = MenuPage;
  pages: Array<{title: string, component: any}>;

  constructor(public events: Events, public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, private backand: BackandService, private storage: Storage,
    public http: Http, private network: Network, private toastCtrl: ToastController) {
     platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
       //connection backand
      backand.init({
        appName: 'dressageapplication',
        signUpToken: 'a64d94ba-f010-4fb1-8bfd-e8cdf1312e69',
        anonymousToken: '78403268-9e75-4970-8da5-c57421674d0f',
        runSocket: false,
        mobilePlatform: 'ionic'
      });



  
      //load tests

      this.http.get('http://localhost/dressageapi/proef/get.php').map(res => res.json().records).subscribe((data) => {
        this.proevenlijst = data;
        storage.set('proevenlijst', this.proevenlijst);
        console.log("Proevenlijst loaded" + this.proevenlijst[0].naam);
      });

   /*   {
        console.dir(data);
        this.proevenlijst = data;

        storage.set('proevenlijst', this.proevenlijst);
        console.log("Proevenlijst loaded" + data.naam);
      },
        (error) =>
        {
          console.dir(error);
        });*/


       /* Backand way

     this.backand.object.getList("Proef", {
        "pageSize": 200,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
        .then((res: any) => {
          this.proevenlijst = res.data;
          storage.set('proevenlijst', this.proevenlijst);
          console.log("Proevenlijst loaded");
        })
        .catch(error => { })*/
       
   

      this.backand.object.getList("Oefening", {
        "pageSize": 200,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
        .then((res: any) => {
          this.oefening = res.data;
          storage.set('oefeningenlijst', this.oefening);
          console.log("Oefeningen loaded");
        })
        .catch(error => { })


      storage.get('oefeningbasislijst').then((val) => {
        if (val == null) {
          this.http.get('http://localhost/dressageapi/basisoefening/get.php').map(res => res.json().records).subscribe((data) => {
            this.oefeningBasis = data;
            storage.set('oefeningbasislijst', this.oefeningBasis);
            console.log("Oefeningbasis loaded");
          },
            (error: any) => {
              console.dir(error);
            });
        } else {
          console.log("basic excercises already in storage, no api call")
        }
      });

      
     
      /*this.backand.object.getList("OefeningBasis", {
        "pageSize": 500,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
        .then((res: any) => {
          this.oefeningBasis = res.data;
          storage.set('oefeningbasislijst', this.oefeningBasis);
          console.log("Oefeningbasis loaded");
        })
        .catch(error => { })*/

      storage.get('puntenlijst').then((val) => {
        if (val == null) {
          this.http.get('http://localhost/dressageapi/punt/get.php').map(res => res.json().records).subscribe((data) => {
            this.puntenlijst = data;
            storage.set('puntenlijst', this.puntenlijst);
            console.log("Puntenlijst loaded");
          },
            (error: any) => {
              console.dir(error);
            });
        } else {
          console.log("points already in storage, no api call")
        }
      });

  

   /*
   this.backand.object.getList("Punt", {
     "pageSize": 21,
     "pageNumber": 1,
     "filter": [],
     "sort": []
   })
     .then((res: any) => {
       this.puntenlijst = res.data;
       console.log("backand", res.data);
       console.log("backand arr", this.puntenlijst);

       //storage.set('puntenlijst', this.puntenlijst);
       console.log("punten loaded");
     })
     .catch(error => { });*/

      this.backand.object.getList("Gebruiker", {
        "pageSize": 21,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
        .then((res: any) => {
          this.gebruikerslijst = res.data;
          storage.set('gebruikerslijst', this.gebruikerslijst);
          console.log("gebruikers loaded");
        })
        .catch(error => { })
   
      
    });
    // used for an example of ngFor and navigation
     this.pages = [
       { title: 'Home', component: MenuPage },
       { title: 'Login', component: LoginPage },
       { title: 'Create test', component: CreateTestPage }


    ];
  }
 
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

 
}
