import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Test } from '../../models/Test';
import { User } from '../../models/User';
import { Http } from '@angular/http';
import { CommentController } from '../../api/CommentController';
import { LocalStorage } from '../../Helper/LocalStorage';
import { TestController } from '../../api/TestController';

@IonicPage()
@Component({
  selector: 'page-menu-vlp',
  templateUrl: 'menu-vlp.html',
})
export class MenuVlpPage {
    public discipline: String;
    public country: String;
    public dressageTestList: Test[] = [];
    public testId: number;
    public testList: Array<Test>;
    first: boolean;
    user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private storage: Storage, private http:Http) {
      this.testList = [];
      this.first = true;
      this.discipline = navParams.get("discipline");
      this.country = navParams.get("country");
      this.user = LocalStorage.currentUser;
      this.dressageTestList = TestController.testList;
      this.sortList();
    }

    sortList() {
      for (let item of this.dressageTestList) {
        if (this.country == "OWN" && item.country == "OWN") {
          if (this.user != null && item.userId == this.user.userId) {
            this.addToList(item);
          }
        } else {
          //select all tests of selected descipline and selected country
          if (item.discipline == this.discipline.toUpperCase() && item.country == this.country) {
            this.addToList(item);
          }
        }
      }
      this.testList.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
    }

    addToList(item) {
      let p = new Test(item.testId, item.discipline, item.country, item.federation, item.testClass, item.name, item.userId);
      this.testList.push(p);
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad MenuVlpPage');
    }

   public startProef(p: Test) {
      this.navCtrl.push(HomePage, {
      proef: p
    });
    }

}


