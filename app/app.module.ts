import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';

import { MenuInternationaalPage } from '../pages/menu-internationaal/menu-internationaal';
import { MenuLrvPageModule } from '../pages/menu-lrv/menu-lrv.module';
import { MenuVlpPageModule } from '../pages/menu-vlp/menu-vlp.module';
import { MenuLrvPage } from '../pages/menu-lrv/menu-lrv';
import { MenuVlpPage } from '../pages/menu-vlp/menu-vlp';

import { MenuPageModule } from '../pages/menu/menu.module';
 
import { MenuInternationaalPageModule } from '../pages/menu-internationaal/menu-internationaal.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackandService } from '@backand/angular2-sdk'

import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MenuPageModule,
    MenuInternationaalPageModule,
    MenuLrvPageModule,
    MenuVlpPageModule
   ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MenuPage,
    MenuInternationaalPage,
    MenuLrvPage,
    MenuVlpPage,
    LoginPage
   ],
  providers: [
    StatusBar,
    BackandService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
