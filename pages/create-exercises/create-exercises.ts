import { CreateTestPage } from '../create-test/create-test';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Test } from '../../models/Test';
import { Circle } from '../../models/Circle';
import { Exercise } from '../../models/Exercise';
import { BasicExercise } from '../../models/BasicExercise';
import { ExerciseController } from '../../api/ExerciseController';
import { TestController } from '../../api/TestController';
import { AlertController,ToastController } from 'ionic-angular';

import * as $ from 'jquery'
import { Http} from '@angular/http';
import 'rxjs/add/operator/map'

import { Guuid } from '../../models/Guuid';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Loading } from '../../Helper/Loading';
import { Alert } from '../../Helper/Alert';
import { Toast } from '../../Helper/Toast';

import { SelectSearchableComponent } from 'ionic-select-searchable';

 

@IonicPage()
@Component({
  selector: 'page-create-exercises',
  templateUrl: 'create-exercises.html',
})
export class CreateExercisesPage {
  public basicExercise: BasicExercise;
  public basicExerciseList: any[] = [];
  public exercise: Exercise;
  public circle: Circle;
  public circleList: Circle[] = [];
  public description: string;
  public pace: string;
  public radius: string;
  public size: string;
  public hand: string;
  public circleId: number;
  public dressageTest: Test;
  public static exerciseList: Exercise[] = [];
  public static serialNumber: number = 0;

  private createExerciseForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private toastCtrl: ToastController,
  public loadingCtrl: LoadingController, private alertCtrl: AlertController, public http: Http, public formBuilder: FormBuilder) {
    CreateExercisesPage.serialNumber = 0;

    storage.get('oefeningbasislijst').then((val) => {
      this.basicExerciseList = []
      for (var i of val) {
        this.basicExerciseList.push(i);
      }
    });
    storage.get('circleList').then((val) => {
      console.log("Circles", val);
      this.circleList = [];
      for (var i of val) {
        this.circleList.push(i);
      }
    });
    this.circle ={circleId:null, direction:"", hand:"", height:0, radius:0}
    this.dressageTest = navParams.get("proef");
    console.log("reeks"+this.dressageTest.testClass);
    this.exercise = { exerciseId: null, basicExerciseId: 1, testId: this.dressageTest.testId, description: "", pace: "", serialNumber: CreateExercisesPage.serialNumber, circleId:0 };
    this.createExerciseForm = formBuilder.group({
      description: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      pace: ['', Validators.required],
      search: ['', Validators.required],
      radius: [],
      size: [],
      hand: []

    });
  }

  update(event: { component: SelectSearchableComponent, value: any }) {
    console.log('circle:', event.value.name);
    if (event.value.name == "circle") {
      $("#circle").css('display', 'block');
    } else {
      $("#circle").css('display', 'none');
    }
  }

  create() {
    console.log("proefid " + this.dressageTest.testId, this.dressageTest.federation, this.dressageTest.name, this.dressageTest.testClass);
    // Loading.startLoading(this.loadingCtrl, "Creating test...");
    TestController.createDressageTest(this.dressageTest, this.http, this.storage);
    ExerciseController.createExercises(this.http, this.alertCtrl, this.navCtrl, this.loadingCtrl, this.storage);
  }

  addExercise() {
    if (this.createExerciseForm.valid) {
      var serial = CreateExercisesPage.serialNumber;
      var BEId = this.basicExercise.basicExerciseId;
      if (serial != 0 && BEId == CreateExercisesPage.exerciseList[serial-1].basicExerciseId) {
        console.log("BEID is hetzelfde!");
        Alert.setAlert(this.alertCtrl, "You cannot choose these letters");
      } else {
        //fields ok, excercise can be created

        //circle
        this.circleId = 0;
        if (this.basicExercise.name == "circle") {
          console.log("radius"+this.circle.radius +"hand" + this.circle.hand +"size" +this.circle.height);

          var basixEx: BasicExercise = this.basicExerciseList.find(x => x.basicExerciseId == this.basicExercise.basicExerciseId);
          var direction = this.getDirection(basixEx);
          if (direction == "") {
            direction = this.circle.hand;
          }
          console.log(direction);
          for (let circle of this.circleList) {
            if (circle.hand == this.circle.hand && circle.radius == this.circle.radius && circle.height == this.circle.height && circle.direction==this.circle.direction) {
              this.circleId = circle.circleId;
            }
          }
        }

        CreateExercisesPage.serialNumber++;
        $(".btnCreate").css('display', '');

        this.exercise = {
          exerciseId: Guuid.newGuid(), basicExerciseId: this.basicExercise.basicExerciseId, testId: this.dressageTest.testId,
          description: this.description, pace: this.pace, serialNumber: CreateExercisesPage.serialNumber, circleId: this.circleId
        };

        console.log("add exercise", this.exercise);
        CreateExercisesPage.exerciseList.push(this.exercise);
        Toast.toastExerciseCreated(this.toastCtrl , "Exercise " + (serial+1) + " successfully created");
      }
    }
  }

  getDirection(basicExercise: BasicExercise) {
    var name = basicExercise.name;
    var direction;
    console.log(name.substr(name.length - 1))
    switch (name.substr(name.length-1).toUpperCase()) {
      case 'A': direction = "DOWN";break;
      case 'F': direction = "RIGHT";break;
      case 'P': direction = "RIGHT"; break;
      case 'B': direction = "RIGHT"; break;
      case 'R': direction = "RIGHT"; break;
      case 'M': direction = "RIGHT"; break;
      case 'C': direction = "UP"; break;
      case 'H': direction = "RIGHT"; break;
      case 'S': direction = "RIGHT"; break;
      case 'E': direction = "RIGHT"; break;
      case 'V': direction = "RIGHT"; break;
      case 'K': direction = "RIGHT"; break;
      default: direction = "";
    }
    console.log(direction);
    return direction;
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateExercisesPage');
    if (CreateExercisesPage.serialNumber > 1) {
      $(".btnCreate").css('display', 'block');
    } else {
      $(".btnCreate").css('display', 'none');
    }
  }
}

