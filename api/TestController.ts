import { Http } from '@angular/http'; 
import { Storage } from '@ionic/storage';
import { Proef } from '../models/proef';


export class TestController{

  private static testList: Proef[] = [];
 
  public static loadAllTests(http, storage) {
    http.get('http://localhost/dressageapi/proef/get.php').map(res => res.json().records).subscribe((data) => {
      this.testList = data;
      storage.set('proevenlijst', this.testList);
      console.log("Proevenlijst loaded");
    },
      (error) => {
        console.dir(error);
      });
  }

    /* Backand way

     this.backand.object.getList("Proef", {
        "pageSize": 200,
        "pageNumber": 1,
        "filter": [],
        "sort": []
      })
        .then((res: any) => {
          this.proevenlijst = res.data;
          storage.set('proevenlijst', this.proevenlijst);
          console.log("Proevenlijst loaded");
        })
        .catch(error => { })*/

}
