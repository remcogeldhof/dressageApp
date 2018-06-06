import { Storage } from '@ionic/storage';
import { Point } from '../models/Point';


export class PointController{

  private static pointList: Point[] = [];
 
  public static loadAllPoints(http, storage) {
    /*storage.get('puntenlijst').then((val) => {
      if (val == null) {*/
    //localhost/dressageapi/point/get.php 10.3.50.51/api/point/get.php
        http.get('http://10.3.50.51/api/point/get.php').map(res => res.json().records).subscribe((data) => {
          this.pointList = data;
          storage.set('Points', this.pointList);
          console.log("Points loaded");
        },
          (error: any) => {
            console.dir(error);
          });
      /* else {
        console.log("points already in storage, no api call")
      }
    });*/

  }

   /*
   this.backand.object.getList("Punt", {
     "pageSize": 21,
     "pageNumber": 1,
     "filter": [],
     "sort": []
   })
     .then((res: any) => {
       this.puntenlijst = res.data;
       console.log("backand", res.data);
       console.log("backand arr", this.puntenlijst);

       //storage.set('puntenlijst', this.puntenlijst);
       console.log("punten loaded");
     })
     .catch(error => { });*/


}
