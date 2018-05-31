import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuVlpPage } from '../menu-vlp/menu-vlp';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery'

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

    private discipline: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, translate: TranslateService) {
        translate.setDefaultLang('en');
        this.discipline = "All dressage tests"; 
  }

  openDressage() {
      this.switchCountry();
      this.discipline = "Dressage";
     // $('.wrapper').css("background-image", "url(../assets/imgs/Dressage3.jpg)");  

  }
  openEventing() {
      this.switchCountry();
      this.discipline = "Eventing";
     // $('.wrapper').css("background-image", "url(../assets/imgs/Eventing4.jpg)");  
  }

  openOwnTests() {
    this.navCtrl.push(MenuVlpPage, {
      discipline: "OWN",
      country: "OWN"
    });
  }

  openFEI() {
      this.navCtrl.push(MenuVlpPage, {
          discipline: this.discipline,
          country: "FEI"
    });
  }

  openBelgium() {
      this.navCtrl.push(MenuVlpPage, {
          discipline: this.discipline,
           country: "Belgium"
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  switchDiscipline() {
      this.discipline = "All dressage tests"
    $(document).ready(function () {
      $("#countries").css('display', 'none');
      $("#disciplines").css('display', 'block');
     // $('.wrapper').css("background-image", "url(../assets/imgs/geopat4.jpg)");  
    });
  }

  switchCountry() {
    $(document).ready(function () {
      $("#countries").css('display', 'block');
      $("#disciplines").css('display', 'none');
    });
  }
}
