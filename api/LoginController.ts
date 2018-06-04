import { Http } from '@angular/http'; 
import { Guuid } from '../models/Guuid';
import { User } from '../models/User';
import { Loading } from '../Helper/Loading';
import { Toast } from '../Helper/Toast';
import { LocalStorage } from '../Helper/LocalStorage';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';

export class LoginController {

  public static currentUser: User;

  public static createLogin(http, user, loading, toast) {
    Loading.startLoading(loading, "Please wait...");

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify(user);
    // 10.3.50.51/api/user/create.php localhost/dressageapi/user/create.php
    http.post('http://10.3.50.51/api/user/create.php', body,
       headers).map(res => res.json()).subscribe(data => {
         console.log(data.message);
         Loading.stopLoading();
         if (data.message == "unable to create login & user") {
           Toast.toastAccountNotCreatedSuccessful(toast);
         } else {
           Toast.toastAccountCreatedSuccessful(toast);
         }
      },
      (error) => {
        console.dir(error);
        Loading.stopLoading();
        Toast.toastAccountNotCreatedSuccessful(toast);
       });
  }

  public static checkLogin(http, user, loading, toast, storage, navCtrl) {
    Loading.startLoading(loading, "Please wait...");

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify(user);
    //10.3.50.51/api/login/checkLogin.php localhost/dressageapi/login/checklogin.php
    http.post('http://10.3.50.51/api/login/checkLogin.php', body, headers).map(res => res.json()).subscribe((data) => {
        if (data.user != null) {
   
          this.currentUser = data.user[0];
          this.currentUser.mail = user.mail;

          console.log('user loaded' + this.currentUser.mail);
          //save user in static variable and local storage
          LocalStorage.setUser(this.currentUser, storage);
          
          // go to menupage
          navCtrl.setRoot(MenuPage);
          // stop loading animation and toast
          Loading.stopLoading();
          Toast.toastLoginSuccessful(toast);
        } else {
          // stop loading animation and toast
          Loading.stopLoading();
          Toast.toastLoginNotSuccessful(toast);
        }
      },
      (error) => {
        console.dir(error);
        Loading.stopLoading();
        Toast.toastLoginNotSuccessful(toast);
      });
  }
}
