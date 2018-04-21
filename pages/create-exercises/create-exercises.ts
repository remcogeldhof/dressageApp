import { CreateTestPage } from '../create-test/create-test';
import { MenuPage } from '../menu/menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Proef } from '../../models/proef';
import { Oefening } from '../../models/oefening';
import { OefeningBasis } from '../../models/oefening-basis';
import { BackandService, Response } from '@backand/angular2-sdk'
import { AlertController } from 'ionic-angular';
import * as $ from 'jquery'
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

import { Guuid } from '../../models/Guuid';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';



/**
 * Generated class for the CreateExercisesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-exercises',
  templateUrl: 'create-exercises.html',
})
export class CreateExercisesPage {
  public basis: OefeningBasis;
  public oefeningBasisItems: any[] = [];
  public oefening: Oefening;
  public proef: Proef;
  public count: number;
  public map: Map<string, string>;
  private searchQuery: string = '';
  private items: string[];
  private exerciseListNames: string[];
  public search: string;
  showList: boolean = false;
  public static exerciseList: Oefening[] = [];
  public list: Oefening[] = [];
  public static reeksNummer: number = 1;

  private createExerciseForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public backand: BackandService,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController, public http: Http, public formBuilder: FormBuilder) {

    storage.get('oefeningbasislijst').then((val) => {
      this.oefeningBasisItems = []
      for (var i of val) {
        this.oefeningBasisItems.push(i);
      }
    });
    this.initializeItems();
    this.exerciseListNames = CreateExercisesPage.exerciseList.map(a => a.gang);
    this.proef = navParams.get("proef");
    console.log("reeks"+this.proef.reeks);
    this.search = "";
    this.showList = false;
    this.oefening = { oefeningId: null, oefeningBasisId: 1, proefId: this.proef.proefId, beschrijving: "", gang: "", reeksNummer: CreateExercisesPage.reeksNummer };

    /*this.createExerciseForm = formBuilder.group({
      description: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });
    */
  }

  next() {
    this.addExercise();

    this.navCtrl.push(CreateExercisesPage, { "proef": this.proef });
  }

  create() {
    console.log("proefid " + this.proef.proefId, this.proef.federatie, this.proef.naam, this.proef.reeks);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let loading = this.loadingCtrl.create({
      content: 'Creating test...'
    });
    loading.present();


    let body = JSON.stringify(this.proef);
    console.log(body);
    this.http.post('http://localhost/dressageapi/proef/create.php', body,
      headers).map(res => res.json()).subscribe(data => {
        console.log(data);
      });
 /*  this.backand.object.create('Proef', this.proef)
      .then((res: any) => {
        console.log("res " + res.status);
        if (res.status == "200") {
          console.log("olz");
        }
      },
      (err: any) => {
        console.log("err " + err);
     });*/

   console.log("log2: ", CreateExercisesPage.exerciseList[0].beschrijving);
   console.log("length: ", CreateExercisesPage.exerciseList.length);

   for (var i = 0; i < CreateExercisesPage.exerciseList.length; i++) {
     console.log("log3: ", CreateExercisesPage.exerciseList[i].beschrijving);

    
     let body = JSON.stringify(CreateExercisesPage.exerciseList[i]);
     console.log(body);
     this.http.post('http://localhost/dressageapi/oefening/create.php', body,
       headers).map(res => res.json()).subscribe(data => {
         console.log(data);
         if (i == CreateExercisesPage.exerciseList.length) {
           loading.dismiss();
           this.setAlert();
         }
       });

     /*
     this.backand.object.create('Oefening', CreateExercisesPage.exerciseList[i])
        .then((res: any) => {
          console.log("res " + res.status);
          if (res.status == "200") {
            console.log("oefening "+i+" pushed");
          }
         if (i == CreateExercisesPage.exerciseList.length) {
           loading.dismiss();
           this.setAlert();
          }
        },
        (err: any) => {
          console.log("err " + err);
       });*/

   }
    console.log("wait for async");


  //  this.storage.set(this.proef.proefNaam, this.exerciseList);
    /*
    this.storage.get("99").then((val) => {
      //oefening1 = <Oefening>val;
      oefening1 = JSON.parse(val);
      console.log('output', oefening1.beschrijving);

    });

    */
 
   //this.navCtrl.push(CreateTestPage, { "proef": this.proef });
 /*
   this.storage.get(this.proef.proefNaam).then((val) => {
      //oefening1 = <Oefening>val;
      for (var i of val) {
       this.list.push(i);
     }

     for (var item of this.list) {
       
       if (item.reeksNummer == 1) {
         console.log('output1', item.gang);
       }
       if (item.reeksNummer == 2) {
         console.log('output2', item.gang);
       }
     }



    });
    */
  }

  addExercise() {
    this.oefening.oefeningId = Guuid.newGuid();
    this.oefening.reeksNummer = CreateExercisesPage.reeksNummer;
    CreateExercisesPage.reeksNummer++;
    console.log("add exercise, reeksnummer=" + this.oefening.reeksNummer);
    var oef: OefeningBasis;
    for (oef of this.oefeningBasisItems) {
       if (oef.naam == this.searchQuery.toUpperCase()) {
         console.log("naam oef" + this.searchQuery);
         this.oefening.oefeningBasisId = oef.oefeningBasisId;
         console.log("id oef" + this.oefening.oefeningBasisId);
      }
    }

 

    // this.storage.set(this.reeksNummer.toString(), JSON.stringify(this.oefening));
    CreateExercisesPage.exerciseList.push(this.oefening);
    console.log("first element: ", CreateExercisesPage.exerciseList[0].beschrijving);

    // set oefening to default for next one
    //this.oefening = { oefeningId: null, oefeningBasisId: 1, proefId: this.proef.proefId, beschrijving: "", gang: "", reeksNummer: CreateExercisesPage.reeksNummer };
  }

  initializeItems() {
    this.items = this.oefeningBasisItems.map(a => a.naam);
   //  this.map = new Map<string, string>();
   // this.map.set(this.oefeningBasisItems.map(a => a.oefeningId).toString(), this.oefeningBasisItems.map(a => a.naam).toString());
   //  console.log(this.map.get("5"));
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    this.showList = true;
    } 
  }

  setAlert() {
    let alert = this.alertCtrl.create({
      title: 'Test created successful',
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.navCtrl.setRoot(MenuPage);
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateExercisesPage');
    if (CreateExercisesPage.exerciseList.length < 1) {
      $(".btnCreate").css('display', 'none');
    } else {
      $("#btnCreate").css('display', 'block');
    }
  }
}
