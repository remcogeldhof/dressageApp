import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery'
import gsap from "gsap";
import { Linear } from "gsap";
import { TweenLite, Power0, TextPlugin } from "gsap";
import { Storage } from '@ionic/storage';
import { User } from '../../models/User';
import { Test } from '../../models/Test';
import { Point } from '../../models/Point';
import { Exercise } from '../../models/Exercise';
import { BasicExercise } from '../../models/BasicExercise';
import { Comment } from '../../models/Comment';
import { Circle } from '../../models/Circle';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentController } from '../../api/CommentController';
import { LoginController } from '../../api/LoginController';
import { Http } from '@angular/http';
import { MenuPage } from '../../pages/menu/menu';
import {Alert} from '../../Helper/Alert'
import { AlertController}  from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
  private commentForm: FormGroup;
  private comment: Comment;
  private user: User;
  private commentList: Comment[] = [];
  toolTimeline = new gsap.TimelineLite({ paused: true });

  public dressageTestList: any[] = [];
  public exerciseList: any[] = [];
  public filteredExerciseList: any[] = [];
  public basicExerciseList: any[] = [];
  public pointList: Point[] = [];
  public circleList: Circle[] = [];
  public dressageTest: Test;
  public exercise: Exercise;
  public basis: BasicExercise;
  public point: Point;

  public speedAnimation: number;
  
  searchQuery: string;
  check: Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public formBuilder: FormBuilder,
    public http: Http, private alertCtrl: AlertController) {
    this.comment = { commentId: null, testId: "", userId: "", firstname: "", lastname: "", comment: "", date:""};

    this.check = true;
    this.dressageTest = navParams.get("proef");
    this.speedAnimation = 1;
    this.exerciseList = []

 
    storage.get('oefeningenlijst').then((val) => {
      console.log("oefeningenlijst",val);
      for (var i of val) {
        this.exerciseList.push(i);
      }
      for (var i of this.exerciseList) {
        if (i.testId == this.dressageTest.testId) {
          this.filteredExerciseList.push(i);
        }
      }
    });

    storage.get('oefeningbasislijst').then((val) => {
      console.log("oefeningbasislijst", val);
      this.basicExerciseList = []
      for (var i of val) {
        this.basicExerciseList.push(i);
      }
     });

    storage.get('Points').then((val) => {
      console.log("Points",val);
      this.pointList = [];
      for (var i of val) {
        this.pointList.push(i);
      }
    });

    storage.get('circleList').then((val) => {
      console.log("Circles", val);
      this.circleList = [];
      for (var i of val) {
        this.circleList.push(i);
      }
    });

    storage.get('currentUser').then((val) => {
      this.user = val;
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
/*
  ionViewWillLeave() {
    console.log("leave page");
    this.storage.ready().then(
      () => {
        this.storage.set('commentList', null);
        this.storage.remove('commentList');
        this.storage.get('commentList').then((val) => {
          console.log(this.commentList);
        });
      });
  }
  */
  startAnimation() {
  /*  let naamProef: String;
    let federatie: String;
    let reeks: String;
    let proefId: number;*/

    let basicExerciseId: number;

    let pointId1: number;
    let pointId2: number;

    let x_from: number;
    let y_from: number;
    let x_to: number;
    let y_to: number;

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
    let duration = 0;
    let kleur = "black";
    let circleId;
  
  
    /*
    this.toolTimeline.add(TweenLite.to('.myAnimation', 3, {
      bezier: { curviness: 1.75, values: [{ x: 0, y:0 }, { x: -62.5, y: 62.5 }, { x: 0, y: 125 }] }
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
          if (item.testId == this.dressageTest.testId && item.serialNumber == count) {
            this.exercise = new Exercise(item.exerciseId, item.exerciseBasicId, item.testId, item.description, item.pace, item.serialNumber, item.circleId);
            basicExerciseId = item.basicExerciseId;
            circleId = item.circleId;

            console.log("beschrijving " + count + " " + this.exercise.description + "oef basis id == " + basicExerciseId);

            for (let item of this.basicExerciseList) {
              if (item.basicExerciseId == basicExerciseId) {
                this.toolTimeline.call(this.placeDescription, [this.exercise.description]);

                pointId1 = item.pointId1;
                pointId2 = item.pointId2;
                duration = item.duration;
                console.log(circleId);
                console.log("duur: " + duration);
                console.log("puntid1" + pointId1);
                console.log("puntid2" + pointId2);
                for (let item of this.pointList) {
                  if (item.pointId == pointId1) {
                    x_from = item.posLeft;
                    y_from = item.posTop;

                  }
                  if (item.pointId == pointId2) {
                    x_to = +item.posLeft;
                    y_to = +item.posTop;
                  }

                }

               // KLEUR VERANDEREN GANG
                if (this.exercise.pace == "GALOP") {
                  duration = duration * 0.75;
                  kleur = "#f4427d";
                }
                if (this.exercise.pace == "STAP") {
                  duration = duration * 2;
                  kleur = "#40408e";
                }

                if (count == 1) {
                  //this.toolTimeline.set("#desc", { text:"Your new text"});
                  this.toolTimeline.add(TweenLite.from('.myAnimation', 0, { left: x_from, top: y_from, backgroundColor: kleur, ease: Linear.easeNone }));
                  console.log(count + "ste keer");
                } else {
                  console.log(count + "de keer");
                  //this.toolTimeline.add(TweenLite.to('.myAnimation', duur, { left: posLeft_from, top: posTop_from, ease: Linear.easeNone }));
                }
               var x2, y2, x3, y3, x4, y4 = 0;
               if (circleId != 0) {
                 console.log(this.circleList);
                  for (let circle of this.circleList){
                    if (circle.circleId == circleId) {
                      var size = circle.height;
                      var half = size / 2;
                      var radius = circle.radius;
                      console.log("size" + size + "half" + half);
                      switch (circle.direction) {
                        case 'RIGHT': console.log("r");
                          if (circle.hand == 'RIGHT') {
                          x2 = half; y2 = -half; x3 = size; y3 = 0, x4=half, y4=half;
                          } else { x2 = half; y2 = half; x3 = size; y3 = 0; x4 = half, y4 = -half}
                          break;
                        case 'DOWN': console.log("DOWN");
                          if (circle.hand == 'RIGHT') {
                            x2 = half; y2 = half; x3 = 0; y3 = size, x4 = -half, y4 = half;
                          } else { x2 = -half; y2 = half; x3 = 0; y3 = size, x4 = half, y4 = -half; }
                          break;
                        case 'LEFT': console.log("LEFT");
                          if (circle.hand == 'RIGHT') {
                            x2 = -half; y2 = half; x3 = -size; y3 = 0, x4 = -half, y4 = -half;
                          } else { x2 = -half; y2 = -half; x3 = -size; y3 = 0, x4 = -half, y4 = half; }
                          break;
                        case 'UP': console.log("up");
                          if (circle.hand == 'RIGHT') {
                            x2 = -half; y2 = -half; x3 = 0; y3 = -size, x4 = half, y4 = -half;
                          } else { x2 = half; y2 = -half; x3 = 0; y3 = -size, x4 = -half, y4 = -half; }
                          break;
                      }
                    }
                 }
                  if (radius == 360) {
                    this.toolTimeline.add(TweenLite.to('.myAnimation', 4, {
                      bezier: { curviness: 1.75, values: [{ x: 0, y: 0 }, { x: x2, y: y2 }, { x: x3, y: y3 }, { x: x4, y: y4 }, { x: 0, y: 0 }] }
                      , ease: Power0.easeNone, repeat: -1
                    }));
                  } else if (radius == 180) {
                    this.toolTimeline.add(TweenLite.to('.myAnimation', 2, {
                      bezier: { curviness: 1.75, values: [{ x: 0, y: 0 }, { x: x2, y: y2 }, { x: x3, y: y3 }] }
                      , ease: Power0.easeNone, repeat: -1
                    }));
                  }
                 
               } else {
                  console.log("-->" + x_to + "||" + y_to );
                 this.toolTimeline.add(TweenLite.to('.myAnimation', duration, { left: x_to, top: y_to, ease: Linear.easeNone }));
               }
               
               

                console.log(kleur);
                //this.toolTimeline.add(TweenLite.set('.myAnimation', { backgroundColor: "#40408e" }));
                // this.toolTimeline.add(TweenLite.to('.myAnimation', 0, {backgroundColor: kleur, }));
              
                
                // this.toolTimeline.call(this.txt());
                //this.toolTimeline.add(TweenLite.to($('#desc'), 0, { css: { opacity: 0 } }));
                //  this.toolTimeline.add(TweenLite.set('.desc', { text: "Your new text" }));

              }
            }
             //$(".myAnimation").css('background-color', kleur);

            kleur = "black";
            volgnummer = item.serialNumber;
            count++;
            if (this.filteredExerciseList.length == item.serialNumber) {
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

    if (this.check == true) {
      this.startAnimation();
      this.check = false;
    }
    this.toolTimeline.play();
    $("#start").css('color', 'grey');
    $("#stop").css('color', 'black');
  }

  stop() {
    this.toolTimeline.pause();
    $("#start").css('color', 'black');
    $("#stop").css('color', 'grey');
  }
 
    opnieuw() {
      this.toolTimeline.restart();
      $("#btnStart span").text("Stop");
      $("#start").css('color', 'grey');
      $("#stop").css('color', 'black');
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

    deleteTest(test) {
      Alert.deleteTestAlert(this.alertCtrl, "Click DELETE if you want to delete this dressage test", this.navCtrl, MenuPage, this.http, this.storage, this.dressageTest.testId);
     // this.navCtrl.setRoot(MenuPage);
    }

    addComment() {
      if (this.commentForm.valid && this.user != null) {
        this.comment.testId = this.dressageTest.testId;
        this.comment.userId = this.user.userId;

        console.log(this.comment.comment);
        console.log(this.comment.testId);
        console.log(this.comment.userId);

        var today = new Date();
        var dateFormat = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + '00';
        console.log(dateFormat);
        this.comment.date = dateFormat;

        CommentController.createComment(this.http, this.comment);
        this.comment.comment = "";
      }
    }

    doInfinite(infiniteScroll) {
      console.log('Begin async operation');
      CommentController.loadCommentsByProefID(this.http, this.storage, this.dressageTest.testId);
      setTimeout(() => {
        this.storage.get('commentList').then((val) => {
          this.commentList = val;
          console.log(this.commentList);
        });
        console.log('Async operation has ended');
        infiniteScroll.complete();
      }, 500);
    }

 
}


 


