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
import { ExerciseController } from '../../api/ExerciseController';
import { Http } from '@angular/http';
import { MenuPage } from '../../pages/menu/menu';
import { Alert } from '../../Helper/Alert'
import { AlertController, ToastController } from 'ionic-angular';

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
    public http: Http, private alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.comment = { commentId: null, testId: "", userId: "", firstname: "", lastname: "", comment: "", date:""};

    this.check = true;
    this.dressageTest = navParams.get("proef");
    this.speedAnimation = 1;
    this.exerciseList = []


    if (ExerciseController.exerciseList.length > 1) {
      this.exerciseList = ExerciseController.exerciseList;
        this.filterExcerciseList();
    } else {
     storage.get('oefeningenlijst').then((val) => {
        console.log("exercises loaded",val);
        for (var i of val) {
          this.exerciseList.push(i);
        }
        this.filterExcerciseList();
      });
    }
   
    storage.get('oefeningbasislijst').then((val) => {
      console.log("basic exercises loaded", val);
      this.basicExerciseList = []
      for (var i of val) {
        this.basicExerciseList.push(i);
      }
     });

    storage.get('Points').then((val) => {
      console.log("Points loaded",val);
      this.pointList = [];
      for (var i of val) {
        this.pointList.push(i);
      }
    });

    storage.get('circleList').then((val) => {
      console.log("Circles loaded", val);
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

  filterExcerciseList() {
    for (var i of this.exerciseList) {
      if (i.testId == this.dressageTest.testId) {
        this.filteredExerciseList.push(i);
      }
    }
  }
  
  ionViewDidLoad() {
    //zodat animatie start bij A
    TweenLite.from('.myAnimation', 0.5, { left: 62.5, top: 0 });
    TweenLite.to('.myAnimation', 0.5, { left: 62.5, top:0 });
  }

  startAnimation() {

    let basicExerciseId: number;
    let pointId1: number;
    let pointId2: number;
    let x_from: number;
    let y_from: number;
    let x_to: number;
    let y_to: number;
    let count = 1;
    let next = true;
    let duration = 0;
    let circleId;

     if (this.filteredExerciseList.length >= 1) {


      while (next == true) {
        for (let item of this.filteredExerciseList) {
          if (item.testId == this.dressageTest.testId && item.serialNumber == count) {
            this.exercise = new Exercise(item.exerciseId, item.exerciseBasicId, item.testId, item.description, item.pace, item.serialNumber, item.circleId);
            basicExerciseId = item.basicExerciseId;
            circleId = item.circleId;

            for (let item of this.basicExerciseList) {
              if (item.basicExerciseId == basicExerciseId) {
                this.toolTimeline.call(this.placeDescription, [this.exercise.description, this.exercise.pace]);

                pointId1 = item.pointId1;
                pointId2 = item.pointId2;
                duration = item.duration;
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

               // SPEED
                if (this.exercise.pace == "CANTER") {
                  duration = duration * 1.25;
                }
                if (this.exercise.pace == "WALK") {
                  duration = duration * 4;
                }
                if (this.exercise.pace == "TROT") {
                  duration = duration * 2;
                }

               
                if (count == 1) {
                  this.toolTimeline.add(TweenLite.from('.myAnimation', 0, { left: x_from, top: y_from, ease: Linear.easeNone }));
                }
                
                var x1, y1, x2, y2, x3, y3, x4, y4, x5, y5 = 0;

                // CHECK IF CIRCLE
                if (circleId != 0) {
                  for (let circle of this.circleList) {
                    if (circle.circleId == circleId) {
                      var size = circle.height;
                      var half = size / 2;
                      // IF HALF CIRCLE OR CIRCLE 10 ON MIDDELLIJN
                      if (item.name.length == 12) {
                        // HALF CIRCLE op middellijn OF op hoefslag
                        if (circle.radius == 180) { }
                        //FULL CIRCLE 10 m vanop middellijn
                        if (circle.radius == 360) {
                          //LEFT SIDE
                          if (x_to == 0) {
                            if (circle.hand == "RIGHT") {
                              x2 = -31.25; y2 = 31.25; x3 = -62.5; y3 = 0, x4 = -31.25, y4 = -31.25;
                            }
                            if (circle.hand == "LEFT") {
                              x2 = -31.25; y2 = -31.25; x3 = -62.5; y3 = 0, x4 = -31.25, y4 = 31.25;
                            }
                          }
                          // RIGHT SIDE
                          if (x_to == 125) {
                            if (circle.hand == "RIGHT") {
                              x2 = 31.25; y2 = 31.25; x3 = 62.5; y3 = 0, x4 = 31.25, y4 = -31.25;
                            }
                            if (circle.hand == "LEFT") {
                              x2 = 31.25; y2 = -31.25; x3 = 62.5; y3 = 0, x4 = 31.25, y4 = 31.25;
                            }
                          }
                          this.toolTimeline.add(TweenLite.to('.myAnimation', duration, {
                            bezier: { curviness: 1.75, values: [{ x: 0, y: 0 }, { x: x2, y: y2 }, { x: x3, y: y3 }, { x: x4, y: y4 }, { x: 0, y: 0 }] }
                            , ease: Power0.easeNone, repeat: -1
                          }));
                        }
                      }
                      // IF FULL CIRCLE HOEFSLAG
                      if (item.name.length == 8) {
                        var radius = circle.radius;
                        switch (item.name.substr(item.name.length - 1).toUpperCase()) {
                          case 'F':
                          case 'P':
                          case 'B':
                          case 'R':
                          case 'M':
                            if (circle.hand == 'RIGHT') {
                              x2 = half; y2 = -half; x3 = size; y3 = 0, x4 = half, y4 = half;
                            } else { x2 = half; y2 = half; x3 = size; y3 = 0; x4 = half, y4 = -half }
                            break;
                          case 'K':
                          case 'V':
                          case 'E':
                          case 'S':
                          case 'H':
                            if (circle.hand == 'RIGHT') {
                              x2 = -half; y2 = half; x3 = -size; y3 = 0, x4 = -half, y4 = -half;
                            } else { x2 = -half; y2 = -half; x3 = -size; y3 = 0, x4 = -half, y4 = half; }
                            break;
                          case 'A': 
                            if (circle.hand == 'RIGHT') {
                              x2 = half; y2 = half; x3 = 0; y3 = size, x4 = -half, y4 = half;
                            } else { x2 = -half; y2 = half; x3 = 0; y3 = size, x4 = half, y4 = half; }
                            break;
                          case 'C':
                            if (circle.hand == 'RIGHT') {
                              x2 = -half; y2 = -half; x3 = 0; y3 = -size, x4 = half, y4 = -half;
                            } else { x2 = half; y2 = -half; x3 = 0; y3 = -size, x4 = -half, y4 = -half; }
                            break;
                        }
                        switch (size.toString()) {
                          case '125.00': duration = duration * 2; break;
                          case '93.75': duration = duration * 1.5; break;
                        }

                        this.toolTimeline.add(TweenLite.to('.myAnimation', duration, {
                          bezier: { curviness: 1.75, values: [{ x: 0, y: 0 }, { x: x2, y: y2 }, { x: x3, y: y3 }, { x: x4, y: y4 }, { x: 0, y: 0 }] }
                          , ease: Power0.easeNone, repeat: -1
                        }));
                      }
                    }
                  }

                  // NO CIRCLE -> IF ITS CORNER
                } else if (basicExerciseId >= 246 && basicExerciseId <= 253) {
                  switch (basicExerciseId.toString()) {
                    //C-M M-C
                    case '246': x2 = 20; y2 = 370; break;
                    case '247': x2 = 20; y2 = 370; x3 = 0; y3 = 340; break;
                    //C-H H-C
                    case '248': x2 = 105; y2 = 370; break;
                    case '249': x2 = 105; y2 = 370; x3 = 125; y3 = 340; break;
                    //A-F F-A
                    case '250':
                    case '251': x2 = 20; y2 = 5; break;
                    //A-K K-A
                    case '252':
                    case '253': x2 = 105; y2 = 5; break;
                  }
                  var values;
                  if (basicExerciseId.toString() == '247' || basicExerciseId.toString() == '249') {
                    values = [{ left: x_from, top: y_from }, { left: x3, top: y3 }, { left: x2, top: y2 }, { left: x_to, top: y_to }];
                  } else {
                    values = [{ left: x_from, top: y_from }, { left: x2, top: y2 }, { left: x_to, top: y_to }];
                  }

                  this.toolTimeline.add(TweenLite.to('.myAnimation', duration, {
                    bezier: {
                      curviness: 1.5, values: values
                    }
                    , ease: Linear.easeNone, repeat: -1
                  }));

                  //BACK right | BACK left | STOP
                } else if (basicExerciseId.toString() == '320') {
                  this.toolTimeline.add(TweenLite.to('.myAnimation', duration/2, { x: -30, y: 0, ease: Linear.easeNone }));
                  this.toolTimeline.add(TweenLite.to('.myAnimation', duration/2, { x: 0, y: 0, ease: Linear.easeNone }));
                } else if (basicExerciseId.toString() == '329') {
                  this.toolTimeline.add(TweenLite.to('.myAnimation', duration/2, { x: 30, y: 0, ease: Linear.easeNone }));
                  this.toolTimeline.add(TweenLite.to('.myAnimation', duration/2, { x: 0, y: 0, ease: Linear.easeNone }));
                } else if (basicExerciseId.toString() == '244') {
                  this.toolTimeline.add(TweenLite.to('.myAnimation',3, { x: 0, y: 0, ease: Linear.easeNone }));
                } else {
                  // NO CIRCLE, NO CORNER, STRAIGHT LINE
                 this.toolTimeline.add(TweenLite.to('.myAnimation', duration, { left: x_to, top: y_to, ease: Linear.easeNone }));
               }

              }
            }
            count++;
            if (this.filteredExerciseList.length == item.serialNumber) {
              next = false;
              console.log("stop");
            }
          }
        }
      }
    }
  }
 
  placeDescription(description, pace) {
    $(".desc").text(description);
    $(".pace").text(pace);
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
      Alert.deleteTestAlert(this.alertCtrl, "Click DELETE if you want to delete this dressage test", this.navCtrl, MenuPage, this.http, this.storage, this.dressageTest, this.toastCtrl);
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


 


