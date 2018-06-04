import { Http } from '@angular/http'; 
import { Storage } from '@ionic/storage';
import { Test } from '../models/Test';
import { CreateExercisesPage } from '../pages/create-exercises/create-exercises';
import { Loading } from '../Helper/Loading';
import { Toast } from '../Helper/Toast';
import { MenuPage } from '../pages/menu/menu';
import { Alert } from '../Helper/Alert';
import { ExerciseController } from '../api/ExerciseController';
import { NavController } from 'ionic-angular';

export class TestController{

  public static testList: Test[] = [];
 
  public static loadAllTests(http, storage) {
    // localhost/dressageapi/dressagetest/get.php 10.3.50.51/api/dressageTest/get.php
    http.get('http://10.3.50.51/api/dressageTest/get.php').map(res => res.json().records).subscribe((data) => {
      this.testList = data;
      storage.set('proevenlijst', this.testList);
      console.log("TestList loaded");
    },
      (error) => {
        console.dir(error);
        storage.get('proevenlijst').then((val) => {
          console.log("Tests loaded from storage");
          for (var i of val) {
            TestController.testList.push(i);
          }
        });
      });                   
  }

  public static createDressageTest(dressageTest, http, storage, navCtrl: NavController, alertCtrl, loadingCtrl) {
    Loading.startLoading(loadingCtrl, "Creating dressage test...");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(dressageTest);
    console.log(body);
    //localhost/dressageapi/dressagetest/create.php 10.3.50.51/api/dressageTest/create.php
    http.post('http://10.3.50.51/api/dressageTest/create.php', body,
      headers).map(res => res.json()).subscribe(data => {
        console.log(data); 
        TestController.loadAllTests(http, storage);
        ExerciseController.loadAllExercises(http, storage);
        navCtrl.setRoot(MenuPage);
        Loading.stopLoading();
        Alert.setAlert(alertCtrl, "Dressage test was created successfully");
      },
      (error) => {
        //Toast.toastTestNotcreated(toast);
        console.dir(error);
        navCtrl.setRoot(MenuPage);
        Loading.stopLoading();
        Alert.setAlert(alertCtrl, "ERROR: Dressage test not created, something went wrong.");
      });

  }

  //10.3.50.51/api/dressageTest/delete.php?id=  dressageapi/dressagetest/delete.php?id=
  public static deleteDressageTest(http, toast, storage, dressageTest: Test) {
    var i= TestController.testList.findIndex(x => x.testId==dressageTest.testId);
    http.post('http://10.3.50.51/api/dressageTest/delete.php?id=' + dressageTest.testId).subscribe(res => {
      console.log(res.json());
      TestController.loadAllTests(http, storage);
      TestController.testList.splice(i, 1);
      Toast.toastTestDeletedSuccessful(toast);
    }, err => {
      console.log(err.json());
      Toast.toastTestNotDeleted(toast);
    });
  }
}
