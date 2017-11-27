import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';

//import * as $ from 'jquery'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
  $element = document.getElementById("myAnimation");

  constructor(public navCtrl: NavController) {
    
	}

    load() {
      this.navCtrl.push(ListPage);
    }

	//bron: https://www.w3schools.com/howto/howto_js_animate.asp

  

    play() {

      document.getElementById("myAnimation").style.webkitAnimationPlayState = "paused";

		//this.verticaal();
		
		//this.horizontaal();
	}


    myFunction() {
      if (document.getElementById("myAnimation").style.webkitAnimationPlayState == "paused") {
        document.getElementById("myAnimation").style.webkitAnimationPlayState = "running";
      } else {
        document.getElementById("myAnimation").style.webkitAnimationPlayState = "paused";
      }

   // document.getElementById("myAnimation").style.animation = "mymove1 8s";
   // document.getElementById("myAnimation").style.animation = "mymove2 3s";
    }

	verticaal() {	
		var speed = 0;

		var elem = document.getElementById("myAnimation");
		var pos = 0; 
		var id = setInterval(frame, speed);
		function frame() {
			if (pos == 429) {
				clearInterval(id);
			} else {
				pos++;
				elem.style.top = pos + 'px';
				elem.style.left = 0 + 'px';
			}

		}
	}

	horizontaal() {
		var speed = 0;


		var elem = document.getElementById("myAnimation");
		var pos = 0;
		var id = setInterval(frame, speed);
		function frame() {
			if (pos == 129) {
				clearInterval(id);
			} else {
				pos++;
				elem.style.left = pos + 'px';
			}

		}
	}


	diagonaal() {



		var speed = 0; //lengte animatie

		var elem = document.getElementById("myAnimation");
		var pos = 0;
		var id = setInterval(frame, speed);
		function frame() {
			if (pos == 100 ) {
				clearInterval(id);
			} else {
				pos++;
				elem.style.top = pos + 'px';
				elem.style.left = pos + 'px';

			}

		}
	}

	test() {
		const maxXPosition = 100;
		let rect = document.getElementById('myAnimation');
		let speedX = 2;
		let positionX = 0;
		function step() {
			positionX = positionX + speedX;
			if (positionX > maxXPosition || positionX < 0) {
				speedX = speedX * (-1);
			}
			rect.style.left = positionX + 'px';
			window.requestAnimationFrame(step);
		}
		window.requestAnimationFrame(step);
	}  

}
