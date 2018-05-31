import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateExercisesPage } from '../create-exercises/create-exercises';
import { Test } from '../../models/Test';
import { User } from '../../models/User';
import { BackandService, Response } from '@backand/angular2-sdk'
import { Guuid } from '../../models/Guuid';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorage } from '../../Helper/LocalStorage';

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
  public dressageTest: Test;
  fed: string = '';
  private todo: FormGroup;
  private user: User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService, private formBuilder: FormBuilder) {
    this.user = LocalStorage.currentUser;

    if (this.user != null) {
    this.dressageTest = { testId: Guuid.newGuid(), discipline: "OWN", country: "OWN", federation: "OWN", testClass: "OWN", name: "", userId: this.user.userId};
      this.todo = this.formBuilder.group({
        name: ['', Validators.required]
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTestPage');
  }

  createTest() {
      this.navCtrl.push(CreateExercisesPage, { "proef": this.dressageTest });
  }

}
  
 
