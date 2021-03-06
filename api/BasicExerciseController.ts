import { BasicExercise } from '../models/BasicExercise';

export class BasicExerciseController{

  private static basicExerciseList: BasicExercise[] = [];
 
  public static loadAllExercises(http, storage) {
 /*   storage.get('oefeningbasislijst').then((val) => {
      if (val == null) {*/
        
        //API 10.3.50.51/api/basicExercise/get.php
        //LOCAL localhost/dressageapi/basicexercise/get.php
        http.get('http://10.3.50.51/api/basicExercise/get.php').map(res => res.json().records).subscribe((data) => {
          this.basicExerciseList = data;
          storage.set('oefeningbasislijst', this.basicExerciseList);
          console.log("Basic exercises loaded");
        },
          (error: any) => {
            console.dir(error);
          });
      /*} else {
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
