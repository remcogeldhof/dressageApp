import { Http } from '@angular/http'; 
import { Storage } from '@ionic/storage';
import { Oefening } from '../models/oefening';


export class ExerciseController{

  private static exerciseList: Oefening[] = [];
 
  public static loadAllExercises(http, storage) {
	 http.get('http://localhost/dressageapi/oefening/get.php').map(res => res.json().records).subscribe((data) => {
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


}
