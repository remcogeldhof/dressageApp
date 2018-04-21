import { Http } from '@angular/http'; 
import { Storage } from '@ionic/storage';
import { OefeningBasis } from '../models/oefening-basis';


export class BasicExerciseController{

  private static basicExerciseList: OefeningBasis[] = [];
 
  public static loadAllExercises(http, storage) {
    storage.get('oefeningbasislijst').then((val) => {
      if (val == null) {
        http.get('http://localhost/dressageapi/basisoefening/get.php').map(res => res.json().records).subscribe((data) => {
          this.basicExerciseList = data;
          storage.set('oefeningbasislijst', this.basicExerciseList);
          console.log("Basic exercises loaded");
        },
          (error: any) => {
            console.dir(error);
          });
      } else {
        console.log("Basic excercises already in storage, no api call")
      }
    });

	  // Backand way

     /*this.backand.object.getList("OefeningBasis", {
        "pageSize": 500,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
        .then((res: any) => {
          this.oefeningBasis = res.data;
          storage.set('oefeningbasislijst', this.oefeningBasis);
          console.log("Oefeningbasis loaded");
        })
        .catch(error => { })*/
	}


}
