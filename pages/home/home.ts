import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery'
import gsap from "gsap";
import { Linear } from "gsap";
import { TweenLite, Power0, TextPlugin } from "gsap";
import { Storage } from '@ionic/storage';
import { Proef } from '../../models/proef';
import { Punt } from '../../models/punt';
import { Oefening } from '../../models/oefening';
import { OefeningBasis } from '../../models/oefening-basis';
import { Comment } from '../../models/comment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentController } from '../../api/CommentController';
import { Http } from '@angular/http';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
  private commentForm: FormGroup;
  private comment: Comment;
  private userId: string;

  element: HTMLElement;
  toolTimeline = new gsap.TimelineLite({ paused: true });
  public proeven: any[] = [];
  public oefeningLijst: any[] = [];
  public filteredExerciseList: any[] = [];
  public oefeningBasis: any[] = [];
  public punt: Punt[] = [];
  public proef: Proef;
  public oef: Oefening;
  public basis: OefeningBasis;
  public p: Punt;
  public speedAnimation: number;
  
  searchQuery: string;
  test: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public formBuilder: FormBuilder, public http: Http) {
    this.comment = { commentId: null, proefId: "", userId : "", comment: "" };
    


    this.test = true;
    this.proef = navParams.get("proef");
    this.speedAnimation = 1;
    this.oefeningLijst = []

    storage.get('oefeningenlijst').then((val) => {
      for (var i of val) {
        this.oefeningLijst.push(i);
      }
      for (var i of this.oefeningLijst) {
        if (i.proefId == this.proef.proefId) {
          this.filteredExerciseList.push(i);
        }
      }
    });

    storage.get('oefeningbasislijst').then((val) => {
      this.oefeningBasis = []
      for (var i of val) {
        this.oefeningBasis.push(i);
      }
     });

    storage.get('puntenlijst').then((val) => {
      this.punt = [];
      for (var i of val) {
        this.punt.push(i);
      }
    });

    storage.get('userid').then((val) => {
      this.userId = val;
    });

    this.commentForm = formBuilder.group({
      commentName: ['', Validators.compose([Validators.maxLength(250), Validators.required])]
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

    let posLeft_from: number;
    let posTop_from: number;
    let posLeft_to: number;
    let posTop_to: number;

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

    /*
    this.toolTimeline.add(TweenLite.to('.myAnimation', 3, {
      bezier: { curviness: 1.75, values: [{ x: 0, y: 0 }, { x: -62.5, y: 62.5 }, { x: 0, y: 125 }] }
      , ease: Power0.easeNone, repeat: -1
    }));*/
    if (this.filteredExerciseList.length >= 1) {


      while (next == true) {
        for (let item of this.filteredExerciseList) {
          if (item.proefId == this.proef.proefId && item.reeksNummer == count) {
            this.oef = new Oefening(item.oefeningId, item.oefeningBasisId, item.proefId, item.beschrijving, item.gang, item.reeksNummer);
            oefeningBasisId = item.oefeningBasisId;
            console.log("beschrijving " + count + " " + this.oef.beschrijving + "oef basis id == " + oefeningBasisId);

            for (let item of this.oefeningBasis) {
              if (item.oefeningBasisId == oefeningBasisId) {
                this.toolTimeline.call(this.placeDescription, [this.oef.beschrijving]);

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
                    posLeft_to = +item.posLeft;
                    posTop_to = +item.posTop;
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
                // this.toolTimeline.call(this.txt());
                //this.toolTimeline.add(TweenLite.to($('#desc'), 0, { css: { opacity: 0 } }));
                //  this.toolTimeline.add(TweenLite.set('.desc', { text: "Your new text" }));

              }
            }
            // $(".myAnimation").css('background-color', 'blue');

            kleur = "black";
            volgnummer = item.reeksNummer;
            count++;
            if (this.filteredExerciseList.length == item.reeksNummer) {
              next = false;
              console.log("stop");
            }
          }


        }
      }
      console.log("stop confirmed, loop stopped");
    }
  }
 

  placeDescription(newtext) {
  $(".desc").text(newtext)
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

    addComment() {
      if (this.commentForm.valid) {
        this.comment.proefId = this.proef.proefId;
        this.comment.userId = this.userId;
        console.log(this.comment.comment);
        console.log(this.comment.proefId);
        console.log(this.comment.userId);

        CommentController.createComment(this.http, this.storage, this.comment);

      }
    }

 
}


 


