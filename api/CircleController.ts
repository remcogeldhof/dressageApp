import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Circle } from '../models/Circle';


export class CircleController {

  private static circleList: Circle[] = [];

  public static loadAllCircles(http, storage) {
    /*   storage.get('oefeningbasislijst').then((val) => {
         if (val == null) {*/
    //LOCAL localhost/dressageapi/circle/get.php
    //API10.3.50.51/api/circle/get.php
    http.get('http://10.3.50.51/api/circle/get.php').map(res => res.json().records).subscribe((data) => {
      this.circleList = data;
      storage.set('circleList', this.circleList);
      console.log("Circles loaded");
    },
      (error: any) => {
        console.dir(error);
      });
    /*} else {
      console.log("Basic excercises already in storage, no api call")
    }
  });*/

  }
}
