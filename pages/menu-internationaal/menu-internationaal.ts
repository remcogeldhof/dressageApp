import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


/**
 * Generated class for the MenuInternationaalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-internationaal',
  templateUrl: 'menu-internationaal.html',
})
export class MenuInternationaalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openMA1() {
    this.navCtrl.push(HomePage);
  }
  openMB1() {
    this.navCtrl.push(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuInternationaalPage');
  }

}
