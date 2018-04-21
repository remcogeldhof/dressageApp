import { Http } from '@angular/http'; 
import { Guuid } from '../models/Guuid';
import { Loading } from '../Helper/Loading';
import { Toast } from '../Helper/Toast';
import { MenuPage } from '../pages/menu/menu';

export class LoginController {

  public static createLogin(http, user, loading, toast) {
    Loading.startLoading(loading);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify(user);

     http.post('http://localhost/dressageapi/user/create.php', body,
      headers).map(res => res.json()).subscribe(data => {
        console.log(data);
        Loading.stopLoading();
        Toast.toastAccountCreatedSuccessful(toast);
      },
      (error) => {
        console.dir(error);
        Loading.stopLoading();
        Toast.toastAccountNotCreatedSuccessful(toast);
      });
  }

  public static checkLogin(http, user, loading, toast, storage, navCtrl) {
    Loading.startLoading(loading);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = JSON.stringify(user);

    var arr: string[] = [];

    http.post('http://localhost/dressageapi/login/checklogin.php', body,
      headers).map(res => res.json()).subscribe(data => {
        if (data != 0) {

          console.log(data.records);
 
          storage.set("token", data);
          storage.set("storageUsername", user.mail);
          storage.set("storagePassword", user.password);
          storage.set("userid", user.userId);
          Loading.stopLoading();
          navCtrl.setRoot(MenuPage);
          Toast.toastLoginSuccessful(toast);
        } else {
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
