import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuVlpPage } from '../menu-vlp/menu-vlp';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery'

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
    private discipline: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, translate: TranslateService) {
        translate.setDefaultLang('en');
        this.discipline = "Dressage Buddy";
    }

  openDressage() {
      this.switchCountry();
      this.discipline = "Dressage";

  }
  openEventing() {
      this.switchCountry();
      this.discipline = "Eventing";
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
      this.discipline = "Dressage Buddy"
    $(document).ready(function () {
      $("#countries").css('display', 'none');
      $("#disciplines").css('display', 'block');
    });
  }

  switchCountry() {
    $(document).ready(function () {
      $("#countries").css('display', 'block');
      $("#disciplines").css('display', 'none');
    });
  }
}
