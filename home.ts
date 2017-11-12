import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }



  //bron: https://www.w3schools.com/howto/howto_js_animate.asp



  play() {
    this.myMove();
    //this.myMove2();

  }

  myMove() {

  var width = screen.width;
  var height = screen.height;
  var speed = 0;

  var elem = document.getElementById("myAnimation");
  var pos = 0;
  var id = setInterval(frame, speed);
  function frame() {
    if (pos == height-200) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + 'px';
     // elem.style.left = pos + 'px';
    }
    
  }
  }

  myMove2() {

    var width = screen.width;
    var height = screen.height;
    var speed = 0;

    var elem = document.getElementById("myAnimation");
    var pos = 0;
    var id = setInterval(frame, speed);
    function frame() {
      if (pos == width - 220) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.left = pos + 'px';
      }

    }
  }
}
