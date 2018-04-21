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
import { TestController } from '../api/TestController';
import { BasicExerciseController } from '../api/BasicExerciseController';
import { PointController } from '../api/PointController';
import { ExerciseController } from '../api/ExerciseController';

import { Toast } from '../Helper/Toast';

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


      //message when no connection
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        Toast.toastNotConnected(this.toastCtrl);
      });

      //message when connected again
      let connectSubscription = this.network.onConnect().subscribe(() => {
        Toast.toastConnected(this.toastCtrl);
      });

      //load tests
      TestController.loadAllTests(this.http, this.storage);
      ExerciseController.loadAllExercises(this.http, this.storage);
      BasicExerciseController.loadAllExercises(this.http, this.storage);
      PointController.loadAllPoints(this.http, this.storage);
     

  /*    this.backand.object.getList("Gebruiker", {
        "pageSize": 21,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
        .then((res: any) => {
          this.gebruikerslijst = res.data;
          storage.set('gebruikerslijst', this.gebruikerslijst);
          console.log("users loaded");
        })
        .catch(error => { })*/
    });
    // used for an example of ngFor and navigation
     this.pages = [
       { title: 'Home', component: MenuPage },
       { title: 'Create Test', component: CreateTestPage },
       { title: 'Account', component: LoginPage }
    ];
  }
 
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    this.nav.setRoot(page.component);
  }
}
