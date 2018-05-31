import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { CreateTestPage } from '../pages/create-test/create-test';
import { CreateExercisesPage } from '../pages/create-exercises/create-exercises';


import { MenuVlpPageModule } from '../pages/menu-vlp/menu-vlp.module';
import { MenuVlpPage } from '../pages/menu-vlp/menu-vlp';

import { MenuPageModule } from '../pages/menu/menu.module';
 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackandService } from '@backand/angular2-sdk'
import { NativeStorage } from '@ionic-native/native-storage';

  
import { IonicStorageModule } from '@ionic/storage';

import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';


import { SelectSearchableModule } from 'ionic-select-searchable';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CreateTestPage,
    CreateExercisesPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MenuPageModule,
    MenuVlpPageModule,
    FormsModule,
    SelectSearchableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    MenuVlpPage,
    LoginPage,
    CreateTestPage,
    CreateExercisesPage

  ],
  providers: [
    StatusBar,
   BackandService,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NativeStorage,
      Network
   

   ]
})
export class AppModule { }

