import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';

import * as $ from 'jquery'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
  element: HTMLElement;
  i: number;

  constructor(public navCtrl: NavController) {
    this.i = 0;
    this.element = document.getElementById("myAnimation");
	}

    load() {
      this.navCtrl.push(ListPage);
    }

	//bron: https://www.w3schools.com/howto/howto_js_animate.asp


    




   
    restart() {

      
        // restart animation
        document.getElementById("myAnimation").style.webkitAnimation = 'none';
        setTimeout(function () {
          document.getElementById("myAnimation").style.webkitAnimation = '';
        },10);
     
      



    //document.getElementById("myAnimation").style.animation = "mymove1 8s linear";

/*
      $(document).ready(function () {
        $("button").click(function () {
          $("#myAnimation").toggleClass('.animation');
        });
      });*/

      /*
     $(document).ready(function () {
        $("button").click(function () {
          $("#myAnimation").css("animation", " mymove2 6s");
        });
      });*/

     // document.getElementById("myAnimation").style.webkitAnimationPlayState = "paused";

		//this.verticaal();
		
		//this.horizontaal();
	}


    start() {
    /*  if (this.i == 0) {
        document.getElementById("myAnimation").style.animation = "frame1 2s linear";

      }*/
        if (document.getElementById("myAnimation").style.webkitAnimationPlayState == "paused") {
          document.getElementById("myAnimation").style.webkitAnimationPlayState = "running";
        } else {
          document.getElementById("myAnimation").style.webkitAnimationPlayState = "paused";
        }
      
   //   this.i++;

      

   // document.getElementById("myAnimation").style.animation = "mymove1 8s";
   // document.getElementById("myAnimation").style.animation = "mymove2 3s";
    }














    // JS animations
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


}
