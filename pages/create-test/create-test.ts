import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateExercisesPage } from '../create-exercises/create-exercises';
import { Proef } from '../../models/proef';
import { BackandService, Response } from '@backand/angular2-sdk'
import { Guuid } from '../../models/Guuid';



/**
 * Generated class for the CreateTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-test',
  templateUrl: 'create-test.html',
})
export class CreateTestPage {
  public proef: Proef;
  fed: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService) {
    this.proef = { proefId: Guuid.newGuid(), naam: "", reeks: "", federatie: "" };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTestPage');
  }

  createTest() {
   
     this.navCtrl.push(CreateExercisesPage, { "proef" :this.proef });
  }

}
  
 
