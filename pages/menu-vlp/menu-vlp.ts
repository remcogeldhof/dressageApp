import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BackandService } from '@backand/angular2-sdk'


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
    public list: Array<Proef> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public backand: BackandService) {
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad MenuVlpPage');
   

  this.backand.object.getList('Proef')
      .then((res: any) => {
        this.proeven = res.data;
        console.log("Proef loaded");

      for (let item of this.proeven) {
        if(item.federatie == "VLP"){
        this.naamProef = item.naam;
        this.reeks = item.reeks;
        this.proefId = item.proefId;
        console.log(item.reeks);
        let p = new Proef(item.proefId, item.naam, item.reeks, item.federatie);
        this.list.push(p);    
      }
      }

      },
      (err: any) => {
        console.log(err.data);
      });
   
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
