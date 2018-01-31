import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';

import { MenuVlpPageModule } from '../pages/menu-vlp/menu-vlp.module';
import { MenuVlpPage } from '../pages/menu-vlp/menu-vlp';

import { MenuPageModule } from '../pages/menu/menu.module';
 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackandService } from '@backand/angular2-sdk'
import { NativeStorage } from '@ionic-native/native-storage';

 import { BackandProevenProvider } from '../providers/backand-proeven/backand-proeven';

import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MenuPageModule,
    MenuVlpPageModule
   ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    MenuVlpPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    BackandService,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NativeStorage,
    BackandProevenProvider
  ]
})
export class AppModule {}
