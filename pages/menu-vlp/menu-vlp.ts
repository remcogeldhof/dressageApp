import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


/**
 * Generated class for the MenuVlpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-vlp',
  templateUrl: 'menu-vlp.html',
})
export class MenuVlpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openB7() {
    this.navCtrl.push(HomePage);
  }
  openB8() {
    this.navCtrl.push(HomePage);
  }
  openJ1() {
    this.navCtrl.push(HomePage);
  }
  openJ2() {
    this.navCtrl.push(HomePage);
  }
  openL9() {
    this.navCtrl.push(HomePage);
  }
  openL10() {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuVlpPage');
  }

}
