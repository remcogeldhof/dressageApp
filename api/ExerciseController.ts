import { Http } from '@angular/http'; 
import { Storage } from '@ionic/storage';
import { Exercise } from '../models/Exercise';
import { CreateExercisesPage } from '../pages/create-exercises/create-exercises';
import { MenuPage } from '../pages/menu/menu';
import { Loading } from '../Helper/Loading';


export class ExerciseController{

  private static exerciseList: Exercise[] = [];
 
  public static loadAllExercises(http, storage) {
	 http.get('http://localhost/dressageapi/exercise/get.php').map(res => res.json().records).subscribe((data) => {
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

  public static createExercises(http, alertCtrl, navCtrl, loadingCtrl, storage) {
     Loading.startLoading(loadingCtrl, "Creating dressage test...");

    for (var i = 0; i < CreateExercisesPage.exerciseList.length; i++) {
      // console.log("log3: ", CreateExercisesPage.exerciseList[i].description);

      let body = JSON.stringify(CreateExercisesPage.exerciseList[i]);
      console.log(body);
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      http.post('http://localhost/dressageapi/exercise/create.php', body,
        headers).map(res => res.json()).subscribe(data => {
          console.log(data);
          if (i == CreateExercisesPage.exerciseList.length) {
            ExerciseController.loadAllExercises(http, storage);
            Loading.stopLoading();
            ExerciseController.setAlert(alertCtrl, navCtrl);
          }
        });
    }
  }

  public static setAlert(alertCtrl, navCtrl) {
    let alert = alertCtrl.create({
      title: 'Test created successful',
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            //navCtrl.setRoot(MenuPage);
            navCtrl.insert(0, MenuPage);
            navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }

}
