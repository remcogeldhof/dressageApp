import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
 

import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';

import { Events } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk'
import { Storage } from '@ionic/storage';

 
@Component({
  selector: 'Dressage App',
  templateUrl: 'app.html'
})
export class MyApp{
  @ViewChild(Nav) nav: Nav;

  public proevenlijst: any[] = [];
  public oefening: any[] = [];
  public oefeningBasis: any[] = [];
  public puntenlijst: any[] = [];
  public gebruikerslijst: any[] = [];



  rootPage: any = MenuPage;
  pages: Array<{title: string, component: any}>;

  constructor(public events: Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private backand: BackandService, private storage: Storage) {
     platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
        
       //load proeven backand
      this.backand.object.getList('Proef')
        .then((res: any) => {
          this.proevenlijst = res.data;
          //https://ionicframework.com/docs/storage/
          storage.set('proevenlijst', this.proevenlijst);
          console.log("Proevenlijst loaded in app component");
        },
        (err: any) => {
          console.log(err.data);
        });

      
      this.backand.object.getList('Oefening')
           .then((res: any) => {
             this.oefening = res.data;
             storage.set('oefeningenlijst', this.oefening);
             console.log("Oefening loaded");
           },
        (err: any) => {
          console.log(err.data);
             //alert(err.data);
           });
       

      this.backand.object.getList("OefeningBasis", {
        "pageSize": 200,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
        .then((res: any) => {
          this.oefeningBasis = res.data;
          storage.set('oefeningbasislijst', this.oefeningBasis);
          console.log("Oefeningbasis loaded");
        })
        .catch(error => { })


     /* this.backand.object.getList('OefeningBasis')
           .then((res: any) => {
             this.oefeningBasis = res.data;
             storage.set('oefeningbasislijst', this.oefeningBasis);
             console.log("Oefeningbasis loaded");
           },
        (err: any) => {
          console.log(err.data);
             // alert(err.data);
           });*/
       

      this.backand.object.getList("Punt", {
        "pageSize": 21,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
        .then((res: any) => {
          this.puntenlijst = res.data;
          storage.set('puntenlijst', this.puntenlijst);
          console.log("punten loaded");
        })
        .catch(error => { })

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


      /* this.backand.object.getList('Punt')
           .then((res: any) => {
             this.puntenlijst = res.data;
             storage.set('puntenlijst', this.puntenlijst);
             console.log("punten loaded");
           },
         (err: any) => {
           console.log(err.data);
             //   alert(err.data);
           });*/
       
   
      
    });
    // used for an example of ngFor and navigation
     this.pages = [
       { title: 'Home', component: MenuPage },
       { title: 'Login', component: LoginPage }

    ];

  }
 
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

 
}
