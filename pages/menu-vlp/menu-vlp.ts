import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BackandService } from '@backand/angular2-sdk'
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Data } from '../../data';
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
    public proeven: any[] = [];
    public naamProef: String;
    public reeks: String;
    public proefId: number;
    public list: Array<Proef>;
    data: Data;
    first: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService, public events: Events, private storage: Storage) {
      this.list = [];
      this.first = true;
       
      storage.get('proevenlijst').then((val) => {
        console.log('dit is het ', val);
        this.proeven = []
        for (var i of val) {
          this.proeven.push(i);
        }
        console.log(this.proeven[0].federatie + "lol");

        for (let item of this.proeven) {

          if (item.federatie == "VLP") {
            this.naamProef = item.naam;
            this.reeks = item.reeks;
            this.proefId = item.proefId;
            console.log(item.reeks);
            let p = new Proef(item.proefId, item.naam, item.reeks, item.federatie);
            this.list.push(p);
          }
        }

      });

     console.log("test");
    //  events.subscribe('proevenList', (proevenlijst, testje) => {
      //  console.log("we are in vlp constructor");
       // console.log(testje);
       // console.log(this.proeven[0].federatie+ "2");
      //  this.proeven = proevenlijst;


        //this.proeven = this.data.getProeven();
//console.log(this.proeven[0].federatie);


     /*   for (let item of this.proeven) {

          if (item.federatie == "VLP") {
            this.naamProef = item.naam;
            this.reeks = item.reeks;
            this.proefId = item.proefId;
            console.log(item.reeks);
            let p = new Proef(item.proefId, item.naam, item.reeks, item.federatie);
            this.list.push(p);
          }
        }*/

      //});

      /*this.backand.object.getList('Proef')
        .then((res: any) => {
          this.proeven = res.data;
          console.log(this.proeven[0].federatie);

          console.log("Proef loaded");
        },
        (err: any) => {
          console.log(err.data);
        });*/
     }

    /*async getproefs() {
    await this.backand.object.getList('Proef').then((res: any) => {
      this.proeven = res.data;
      console.log(this.proeven[0].federatie);
      console.log("da5dd");

   //  await this.events.subscribe('proevenList', (proevenlijst, testje) => {
      // this.proeven = proevenlijst;

       for (let item of this.proeven) {
         console.log(this.proeven[0].naam);

         if (item.federatie == "VLP") {
           this.naamProef = item.naam;
           this.reeks = item.reeks;
           this.proefId = item.proefId;
           console.log(item.reeks);
           let p = new Proef(item.proefId, item.naam, item.reeks, item.federatie);
           this.list.push(p);
         }
       }



      s
     //   });
     this.first = false;

    }*/

 ionViewDidLoad() {
   console.log('ionViewDidLoad MenuVlpPage');
 

  //30 min

   /* this.backand.object.getList('Proef')
      .then((res: any) => {
        this.proeven = res.data;
        console.log("Proef loaded");
        */
     // this.events.subscribe('proevenList', (proevenlijst, testje) => {
      //this.proeven = proevenlijst;

    
       
    
      //});
      /*}

      },
      (err: any) => {
        console.log(err.data);
      });
   */
  }


  public startProef(p:Proef) {
    this.navCtrl.push(HomePage, {
    proef: p
  });
  }

 

 

}

class Proef { 
   //field 
   proefId:number;
   proefNaam: string;
   reeks:string;
   federatie:string
 
   //constructor 
   constructor(proefId:number, proefNaam: string, reeks:string, federatie:string) { 
      this.proefId = proefId
      this.proefNaam = proefNaam 
      this.reeks = reeks 
      this.federatie = federatie 
   }  
}


