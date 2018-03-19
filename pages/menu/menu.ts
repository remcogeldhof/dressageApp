import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuVlpPage } from '../menu-vlp/menu-vlp';



/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openInternationaal() {
    this.navCtrl.push(MenuVlpPage, {
      federatie: "FEI"
    });
  }
  openLRV() {
    this.navCtrl.push(MenuVlpPage, {
      federatie: "LRV"
    });
  }
  openVLP() {
    this.navCtrl.push(MenuVlpPage, {
      federatie: "VLP"
    });
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
