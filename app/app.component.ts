import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
 

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';


import { BackandService, Response } from '@backand/angular2-sdk'


@Component({
  selector: 'Dressage App',
  templateUrl: 'app.html'
})
export class MyApp{
  @ViewChild(Nav) nav: Nav;

 

  rootPage: any = MenuPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private backand: BackandService) {
     platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      backand.init({
        appName: 'dressageapplication',
        signUpToken: 'a64d94ba-f010-4fb1-8bfd-e8cdf1312e69',
        anonymousToken: '78403268-9e75-4970-8da5-c57421674d0f',
        runSocket: false,
        mobilePlatform: 'ionic'
      });
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Menu', component: MenuPage },
      { title: 'Login', component: LoginPage }

    ];

  }
 
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

 
}
