import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';


import * as $ from 'jquery'
import gsap from "gsap";
import { Linear } from "gsap";
import { TweenLite, TweenMax } from "gsap";
import { BackandService } from '@backand/angular2-sdk'
 

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
  element: HTMLElement;
  toolTimeline = new gsap.TimelineLite({ paused: true });
  public proeven: any[] = [];
  public oefening: any[] = [];
  public oefeningBasis: any[] = [];
  public punt: any[] = [];
  public proef:Proef;
  
  searchQuery: string;
  test: Boolean;

  constructor(public navCtrl: NavController, public backand: BackandService, public navParams: NavParams) {
    this.test = true;
    this.proef = navParams.get("proef");
     
  }
  
    

  public getOefening() {
    this.backand.object.getList('Oefening')
      .then((res: any) => {
        this.oefening = res.data;
        console.log("Oefening loaded");

      },
      (err: any) => {
        //alert(err.data);
      });
  }

  public getOefeningBasis() {
    this.backand.object.getList('OefeningBasis')
      .then((res: any) => {
        this.oefeningBasis = res.data;
        console.log("Oefeningbasis loaded");

      },
      (err: any) => {
       // alert(err.data);
      });
  }

  public getPunten() {
    this.backand.object.getList('Punt')
      .then((res: any) => {
        this.punt = res.data;
        console.log("punten loaded");

      },
      (err: any) => {
     //   alert(err.data);
      });
  }


  ionViewDidLoad() {

    //zodat animatie start bij A
    TweenLite.from('.myAnimation', 0.5, { left: 64.5, top: 0 });
    TweenLite.to('.myAnimation', 0.5, { left: 64.5, top: 0 });

    //data halen
   // this.getProeven();
    this.getOefening();
    this.getOefeningBasis();
    this.getPunten();
  }


  startAnimation() {
  /*  let naamProef: String;
    let federatie: String;
    let reeks: String;
    let proefId: number;*/

    let oefeningBasisId: number;

    let puntId1: number;
    let puntId2: number;

    let posLeft;
    let posTop;


 /*   for (let item of this.proeven) {
      naamProef = item.naam;
      federatie = item.federatie;
      reeks = item.reeks;
      proefId = item.proefId;
      console.log(reeks);
      console.log(proefId);
    }*/

    for (let item of this.oefening) {
      oefeningBasisId = item.oefeningBasisId;
      console.log(oefeningBasisId);
    }

    for (let item of this.oefeningBasis) {
      puntId1 = item.puntId1;
      puntId2 = item.puntId2;

      console.log(puntId2);
    }

    for (let item of this.punt) {
      if (item.puntId == puntId1) {
        posLeft = item.posLeft;
        posTop = item.posTop;
        console.log(posLeft);
        console.log(posTop);
        this.toolTimeline.add(TweenLite.to('.myAnimation', (posLeft * 0.01), { left: posLeft, top: posTop, ease: Linear.easeNone }));
      }
    }
    for (let item of this.punt) {
      if (item.puntId == puntId2) {
        posLeft = item.posLeft;
        posTop = item.posTop;
        console.log(posLeft);
        console.log(posTop);
        this.toolTimeline.add(TweenLite.to('.myAnimation', (posTop*0.01), { left: posLeft, top: posTop, ease: Linear.easeNone }));
      }
    }
    /*
    var duration = .5;
    this.toolTimeline.add(TweenLite.to('.myAnimation', 0.654, { left: 64.5,top:0, ease: Linear.easeNone }));
    this.toolTimeline.add(TweenLite.to('.myAnimation', 1.29, { left: 64.5, top:429, ease: Linear.easeNone }));
   this.toolTimeline.add(TweenLite.to('.myAnimation', 0.429, { top: 42.9, ease: Linear.easeNone }));
    this.toolTimeline.add(TweenLite.to('.myAnimation', 3.861, { top: 386.1, left: 0, ease: Linear.easeNone }));
    this.toolTimeline.add(TweenLite.to('.myAnimation', 0.429, { top: 429, left: 0, ease: Linear.easeNone }));*/

  }
    
  start() {
    console.log("start");

    if (this.test == true) {
      this.startAnimation();
      this.test = false;
    }
      this.element = document.getElementById("btnStart");
      if ($("#btnStart span").text() == "Start") {
        $("#btnStart span").text("Stop")
        this.toolTimeline.play();
      } else {
        $("#btnStart span").text("Start")
        this.toolTimeline.pause();
      }
    }
 
    opnieuw() {
      this.toolTimeline.restart();
      $("#btnStart span").text("Stop");
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
