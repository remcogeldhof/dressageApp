import { Http } from '@angular/http'; 
import { Storage } from '@ionic/storage';
import { Test } from '../models/Test';
import { CreateExercisesPage } from '../pages/create-exercises/create-exercises';
import { Loading } from '../Helper/Loading';

export class TestController{

  private static testList: Test[] = [];
 
  public static loadAllTests(http, storage) {
    console.log("load tests.....");
    http.get('http://localhost/dressageapi/dressagetest/get.php').map(res => res.json().records).subscribe((data) => {
      this.testList = data;
      console.log("load tests.....")

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

  public static createDressageTest(dressageTest, http, storage) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(dressageTest);
    console.log(body);
    http.post('http://localhost/dressageapi/dressagetest/create.php', body,
      headers).map(res => res.json()).subscribe(data => {
        console.log(data); 
        TestController.loadAllTests(http, storage);
      });
  }

  public static deleteDressageTest(http, storage, testId) {
    console.log(testId)
    http.post('http://localhost/dressageapi/dressagetest/delete.php?id=' + testId).subscribe(res => {
      console.log(res.json());
    }, err => {
      console.log(err.json());
    });
    TestController.loadAllTests(http, storage);
  }


}
