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
  public circleId: number;
  public dressageTest: Test;
  public static exerciseList: Exercise[] = [];
  public static serialNumber: number = 0;
  public textShow: string;

  private createExerciseForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private toastCtrl: ToastController,
  public loadingCtrl: LoadingController, private alertCtrl: AlertController, public http: Http, public formBuilder: FormBuilder) {
    CreateExercisesPage.serialNumber = 0;
    this.textShow = "show dressage letters";
    storage.get('oefeningbasislijst').then((val) => {
      this.basicExerciseList = []
      for (var i of val) {
        this.basicExerciseList.push(i);
      }
    });
    storage.get('circleList').then((val) => {
      this.circleList = [];
      for (var i of val) {
        this.circleList.push(i);
      }
    });
    this.circle ={circleId:null, direction:"", hand:"", height:0, radius:0}
    this.dressageTest = navParams.get("proef");
    this.exercise = { exerciseId: null, basicExerciseId: 1, testId: this.dressageTest.testId, description: "", pace: "", serialNumber: CreateExercisesPage.serialNumber, circleId:0 };
    this.createExerciseForm = formBuilder.group({
      description: ['', Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      pace: ['', Validators.required],
      search: ['', Validators.required],
      size: [],
      hand: []
    });
  }

  update(event: { component: SelectSearchableComponent, value: any }) {
    if (event.value.name.substring(0, 6) == "circle") {
      if (event.value.name.length == 12) {
        $("#size").css('display', 'none');
      } 
      $("#circle").css('display', 'block'); 
    } else {
      $("#circle").css('display', 'none');
    }
  }

  create() {
    TestController.createDressageTest(this.dressageTest, this.http, this.storage, this.navCtrl, this.alertCtrl, this.loadingCtrl);
    ExerciseController.createExercises(this.http, this.toastCtrl, this.storage);
  }

  addExercise() {
    if (this.createExerciseForm.valid) {
      var serial = CreateExercisesPage.serialNumber;
      var BEId = this.basicExercise.basicExerciseId;
      if (serial != 0 && this.basicExercise.name.substring(0,6) != "circle" && BEId == CreateExercisesPage.exerciseList[serial - 1].basicExerciseId) {
          console.log("basicExerciseId is equals as previous id");
          Alert.setAlert(this.alertCtrl, "You cannot choose these letters");
      }else {
        //fields ok, excercise can be created
        //circle?
        this.circleId = 0;
        if (this.basicExercise.name.substring(0, 6) == "circle") {
          for (let circle of this.circleList) {
            if (this.basicExercise.name.length == 8 && circle.hand == this.circle.hand && parseFloat(circle.height.toString()) == parseFloat(this.circle.height.toString()) && circle.radius == 360){
              this.circleId = circle.circleId;
            }
            if (this.basicExercise.name.length == 12 && circle.hand == this.circle.hand &&  circle.height == 62.50 && circle.radius==360) {
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
        console.log("exercise add: ", this.exercise);
        CreateExercisesPage.exerciseList.push(this.exercise);
        Toast.toastExerciseCreated(this.toastCtrl , "Exercise " + (serial+1) + " successfully created");
      }
    }
  }

  showLetters() {
    if (!$('#letters').is(':visible')) {
      $("#letters").css('display', 'block');
      this.textShow = "Hide dressage letters";
    } else {
      $("#letters").css('display', 'none');
      this.textShow = "Show dressage letters";
    }
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

