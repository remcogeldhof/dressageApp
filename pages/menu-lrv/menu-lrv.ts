import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the MenuLrvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-lrv',
  templateUrl: 'menu-lrv.html',
})
export class MenuLrvPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openA() {
    this.navCtrl.push(HomePage);
  }
  openB() {
    this.navCtrl.push(HomePage);
  }
  openL() {
    this.navCtrl.push(HomePage);
  }
  openM() {
    this.navCtrl.push(HomePage);
  }
  openZ() {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuLrvPage');
  }

}
