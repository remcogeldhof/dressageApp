import { LoadingController } from 'ionic-angular';

export class Loading {

  private static loading;

  private static basicLoading(loadingCtrl) {
    this.loading = loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  public static startLoading(loadingCtrl) {
    this.basicLoading(loadingCtrl);
    this.loading.present();
  }

  public static stopLoading() {
    this.loading.dismiss();
  }
}


