import {TestController} from "../api/TestController"

export class Alert {
  
  public static setAlert(alertCtrl, message) {
    let alert = alertCtrl.create({
      title: message,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
        }
      ]
    });
    alert.present();
  }

   public static deleteTestAlert(alertCtrl, message, navCtrl, page, http, storage, testId, toast) {
    let alert = alertCtrl.create({
      title: message,
      buttons: [
        {
          text: 'DELETE',
          role: 'ok',
          handler: () => {
            TestController.deleteDressageTest(http, toast, storage, testId);
            //navCtrl.setRoot(MenuPage);
            navCtrl.insert(0, page);
            navCtrl.popToRoot();
          }
        },
        {
          text: 'CANCEL',
          role: 'cancel',
           handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

}


