import { LoadingController } from 'ionic-angular';

export class Loading {

  private static loading;

  private static basicLoading(loadingCtrl, message) {
    this.loading = loadingCtrl.create({
      content: message
    });
  }

  public static startLoading(loadingCtrl, message) {
    this.basicLoading(loadingCtrl, message);
    this.loading.present();
  }

  public static stopLoading() {
    this.loading.dismiss();
  }

}


