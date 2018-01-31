import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 

import * as $ from 'jquery'
import gsap from "gsap";
import { Linear } from "gsap";
import { TweenLite } from "gsap";

import { Storage } from '@ionic/storage';

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
  public proef: Proef;
  public oef: Oefening;
  public basis: OefeningBasis;
  public p: Punt;
  public speedAnimation: number;

  
  
  searchQuery: string;
  test: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.test = true;
    this.proef = navParams.get("proef");
    this.speedAnimation = 1;

    storage.get('oefeningenlijst').then((val) => {
      console.log("oefn");
      this.oefening = []
      for (var i of val) {
        this.oefening.push(i);
      }

      console.log(this.oefening[0].oefeningId);
    });

    storage.get('oefeningbasislijst').then((val) => {
      console.log("bas");
      this.oefeningBasis = []
      for (var i of val) {
        this.oefeningBasis.push(i);
      }

      console.log(this.oefeningBasis[0].oefeningBasisId);
    });

    storage.get('puntenlijst').then((val) => {
      console.log("put");
      this.punt = []
      for (var i of val) {
        this.punt.push(i);
      }

      console.log(this.punt[0].puntId);
    });

     
  }
  
  

  ionViewDidLoad() {

    //zodat animatie start bij A
    TweenLite.from('.myAnimation', 0.5, { left: 62.5, top: 0 });
    TweenLite.to('.myAnimation', 0.5, { left: 62.5, top: 0 });

  }


  startAnimation() {
  /*  let naamProef: String;
    let federatie: String;
    let reeks: String;
    let proefId: number;*/

    let oefeningBasisId: number;

    let puntId1: number;
    let puntId2: number;

    let posLeft_from;
    let posTop_from;
    let posLeft_to;
    let posTop_to;

 /*   for (let item of this.proeven) {
      naamProef = item.naam;
      federatie = item.federatie;
      reeks = item.reeks;
      proefId = item.proefId;
      console.log(reeks);
      console.log(proefId);
    }*/
    let count = 1;
    let next = true;
    let volgnummer = 0;
    let duur = 0;
    let kleur = "black";

     /*
    
    this.toolTimeline.add(TweenLite.to('.myAnimation', 3, {
      bezier: { curviness: 1.75, values: [{ x: 0, y: 0 }, { x: -62.5, y: 62.5 }, { x: 0, y: 125 }] }
      , ease: Power0.easeNone, repeat: -1
    }));


    this.toolTimeline.add(TweenLite.to('.myAnimation', 3, {
      bezier: { curviness: 1.75, values: [{ x: 0, y: 125 }, { x: 62.5, y: 62.5+125 }, { x: 0, y: 250 }] }
      , ease: Power0.easeNone, repeat: -1
    }));

    this.toolTimeline.add(TweenLite.to('.myAnimation', 3, {
      bezier: { curviness: 2, values: [{ x: 0, y: 250 }, { x: -62.5, y: 62.5 + 250 }, { x: 0, y: 375 }] }
      , ease: Power0.easeNone, repeat: -1
    }));
    */
   

    while (next == true) {
      for (let item of this.oefening) {
        if (item.proefId == this.proef.proefId && item.reeksNummer == count) {
          this.oef = new Oefening(item.oefeningId, item.oefeningBasisId, item.proefId, item.beschrijving, item.gang, item.reeksNummer);
          oefeningBasisId = item.oefeningBasisId;
          console.log("beschrijving " + count + " " + this.oef.beschrijving + "oef basis id == " + oefeningBasisId);
           
      
          for (let item of this.oefeningBasis) {
            if (item.oefeningBasisId == oefeningBasisId) {
              puntId1 = item.puntId1;
              puntId2 = item.puntId2;
              duur = item.duur;
             
              console.log("duur: " + duur);
              console.log("puntid1" + puntId1);
              console.log("puntid2" + puntId2);
              for (let item of this.punt) {
                if (item.puntId == puntId1) {
                  posLeft_from = item.posLeft;
                  posTop_from = item.posTop;
                }
                if (item.puntId == puntId2) {
                  posLeft_to = item.posLeft;
                  posTop_to = item.posTop;
                }
              }

              /* KLEUR VERANDEREN GANG
              if (this.oef.gang == "GALOP") {
                console.log(this.oef.gang);
                duur = duur * 0.75;
                kleur = "#f4427d";
              }
              if (this.oef.gang == "STAP") {
                duur = duur * 2;
                kleur = "#40408e";
              }*/

              if (count == 1) {
                //this.toolTimeline.set("#desc", { text:"Your new text"});
                this.toolTimeline.add(TweenLite.from('.myAnimation', 0, { left: posLeft_from, top: posTop_from, backgroundColor: kleur, ease: Linear.easeNone }));
                console.log(count + "ste keer");
              } else {
                console.log(count + "de keer");
                //this.toolTimeline.add(TweenLite.to('.myAnimation', duur, { left: posLeft_from, top: posTop_from, ease: Linear.easeNone }));
              }
              console.log(kleur);
              //this.toolTimeline.add(TweenLite.set('.myAnimation', { backgroundColor: "#40408e" }));
             // this.toolTimeline.add(TweenLite.to('.myAnimation', 0, {backgroundColor: kleur, }));
              this.toolTimeline.add(TweenLite.to('.myAnimation', duur, { left: posLeft_to, top: posTop_to, ease: Linear.easeNone }));
              //this.toolTimeline.add(TweenLite.to($('#desc'), 0, { css: { opacity: 0 } }));
            //  this.toolTimeline.add(TweenLite.set('.desc', { text: "Your new text" }));
        
            }
          }
             // $(".myAnimation").css('background-color', 'blue');

          kleur = "black";
          volgnummer = item.reeksNummer;
          count++;
          if (volgnummer == 13){
            next = false;
            console.log("stop");
          }
        }
    

      }
    }
    console.log("stop confirmed, loop stopped");

  }
    
  start() {
    console.log("start");

    if (this.test == true) {
      this.startAnimation();
      this.test = false;
    }
    this.toolTimeline.play();
  }

  stop() {
    this.toolTimeline.pause();
  }
 
    opnieuw() {
      this.toolTimeline.restart();
      $("#btnStart span").text("Stop");
    }

    speedUp() {
      if (this.speedAnimation == 5) {
        this.speedAnimation = 5;
      } else {
        this.speedAnimation++;
      }
      this.toolTimeline.timeScale(this.speedAnimation);

      $("#speed").text("x" + this.speedAnimation);
    }
    speedDown() {
      if (this.speedAnimation == 1) {
        this.speedAnimation = 1;

      } else {
        this.speedAnimation--;
      }
      this.toolTimeline.timeScale(this.speedAnimation);
      $("#speed").text("x"+this.speedAnimation);

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

class Oefening {
  //field 
  oefeningId: number;
  oefeningBasisId: number;
  proefId: number;
  beschrijving: string;
  gang: string;
  reeksNummer: number;

  //constructor 
  constructor(oefeningId: number, oefeningBasisId: number, proefId: number, beschrijving: string, gang: string, reeksNummer: number) {
    this.oefeningId = oefeningId
    this.oefeningBasisId = oefeningBasisId
    this.proefId = proefId
    this.beschrijving = beschrijving
    this.gang = gang
    this.reeksNummer = reeksNummer
  }
}

class OefeningBasis {
  //field 
  oefeningBasisId: number;
  naam: string;
  puntId1: number;
  puntId2: number;
  duur: number;

  //constructor 
  constructor(oefeningBasisId: number, naam: string, puntId1: number, puntId2: number, duur:number) {
    this.oefeningBasisId = oefeningBasisId
    this.naam = naam
    this.puntId1 = puntId1
    this.puntId2 = puntId2
    this.duur = duur;
  }
}

class Punt {
  //field 
  puntId: number;
  naam: string;
  posLeft: number;
  posTop: number;

  //constructor 
  constructor(puntId: number, naam: string, posLeft: number, posTop: number) {
    this.puntId = puntId
    this.naam = naam
    this.posLeft = posLeft
    this.posTop = posTop
  }
}
