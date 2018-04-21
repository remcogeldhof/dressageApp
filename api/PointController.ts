import { Http } from '@angular/http'; 
import { Storage } from '@ionic/storage';
import { Punt } from '../models/punt';


export class PointController{

  private static pointList: Punt[] = [];
 
  public static loadAllPoints(http, storage) {
    storage.get('puntenlijst').then((val) => {
      if (val == null) {
        http.get('http://localhost/dressageapi/punt/get.php').map(res => res.json().records).subscribe((data) => {
          this.pointList = data;
          storage.set('Points', this.pointList);
          console.log("Points loaded");
        },
          (error: any) => {
            console.dir(error);
          });
      } else {
        console.log("points already in storage, no api call")
      }
    });

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
