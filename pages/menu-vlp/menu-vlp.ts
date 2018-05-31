import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BackandService } from '@backand/angular2-sdk'
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Test } from '../../models/Test';
import { User } from '../../models/User';
import { Http } from '@angular/http';
import { CommentController } from '../../api/CommentController';
import { LocalStorage } from '../../Helper/LocalStorage';

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
    public discipline: String;
    public country: String;

    public dressageTestList: any[] = [];
    public testId: number;
    public testList: Array<Test>;
    first: boolean;
    user: User;

    constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService, public events: Events, private storage: Storage, private http:Http) {
      this.testList = [];
      this.first = true;
      this.discipline = navParams.get("discipline");
      this.country = navParams.get("country");
      this.user = LocalStorage.currentUser;
      storage.get('proevenlijst').then((val) => {
        console.log('dit is het ', val);
        this.dressageTestList = []
        for (var i of val) {
          this.dressageTestList.push(i);
        }

        for (let item of this.dressageTestList) {
          if (item.country != "OWN") {
            //select all tests of selected descipline and selected country
            if (item.discipline == this.discipline.toUpperCase() && item.country == this.country) {
              this.addToList(item);
            }
          } else {
            if (this.user != null && item.userId == this.user.userId) {
              this.addToList(item);
            }
          }
        }

        this.testList.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); }); 

      });

     }

    addToList(item) {
      let p = new Test(item.testId, item.discipline, item.country, item.federation, item.testClass, item.name, item.userId);
      console.log(p);
      this.testList.push(p);
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad MenuVlpPage');
    }


 public startProef(p: Test) {
    //CommentController.loadCommentsByProefID(this.http, this.storage, p.testId);
    this.navCtrl.push(HomePage, {
    proef: p
  });
  }

}
/*
class Proef {
  //field 
  proefId: number;
  proefNaam: string;
  reeks: string;
  federatie: string

  //constructor 
  constructor(proefId: number, proefNaam: string, reeks: string, federatie: string) {
    this.proefId = proefId
    this.proefNaam = proefNaam
    this.reeks = reeks
    this.federatie = federatie
  }

}*/



