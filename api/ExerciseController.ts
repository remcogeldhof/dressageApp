import { Http } from '@angular/http'; 
import { Storage } from '@ionic/storage';
import { Exercise } from '../models/Exercise';
import { CreateExercisesPage } from '../pages/create-exercises/create-exercises';
import { MenuPage } from '../pages/menu/menu';
import { Loading } from '../Helper/Loading';
import { Alert } from '../Helper/Alert';


export class ExerciseController{

  public static exerciseList: Exercise[] = [];
 
  public static loadAllExercises(http, storage) {
    http.get('http://10.3.50.51/api/exercise/get.php').map(res => res.json().records).subscribe((data) => {
       this.exerciseList = data;
       storage.set('oefeningenlijst', this.exerciseList);
            console.log("Exercises loaded");
          },
            (error: any) => {
            console.dir(error);
  });

	  // Backand way

      /*this.backand.object.getList("Oefening", {
        "pageSize": 200,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
        .then((res: any) => {
          this.oefening = res.data;
          storage.set('oefeningenlijst', this.oefening);
          console.log("Oefeningen loaded");
        })
        .catch(error => { })*/
	}

  public static createExercises(http, storage, toast) {
    for (var i = 0; i < CreateExercisesPage.exerciseList.length; i++) {
      // console.log("log3: ", CreateExercisesPage.exerciseList[i].description);

      let body = JSON.stringify(CreateExercisesPage.exerciseList[i]);
      console.log(body);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      http.post('http://10.3.50.51/api/exercise/create.php', body,
        headers).map(res => res.json()).subscribe(data => {
          console.log(data);
        if (i == CreateExercisesPage.exerciseList.length) {
          console.log("last");
        }
        },
        (error: any) => {
          console.dir(error);
        });
    }
  }

  

}

//10.3.50.51/api/exercise/create.php  localhost/dressageapi/exercise/create.php
//10.3.50.51/api/exercise/get.php localhost/dressageapi/exercise/get.php
