import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';

import * as $ from 'jquery'
import gsap from "gsap";
import { Linear } from "gsap";
import { TweenLite } from "gsap";
 


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
  element: HTMLElement;
  toolTimeline = new gsap.TimelineLite({ paused: true });


  constructor(public navCtrl: NavController) {

 	}

    ionViewDidLoad() {
      var duration = .5;
      this.toolTimeline.add(TweenLite.from('.myAnimation', 0.645, { left: 64.5, ease: Linear.easeNone }));
      this.toolTimeline.add(TweenLite.to('.myAnimation', 1.29, { left: 129, ease: Linear.easeNone }));
      this.toolTimeline.add(TweenLite.to('.myAnimation', 0.429, { top: 42.9, ease: Linear.easeNone }));
      this.toolTimeline.add(TweenLite.to('.myAnimation', 3.861, { top: 386.1, left: 0, ease: Linear.easeNone }));
      this.toolTimeline.add(TweenLite.to('.myAnimation', 0.429, { top: 429, left: 0, ease: Linear.easeNone }));

      
     }
    
    start() {
      this.element = document.getElementById("btnStart");
      if ($("#btnStart span").text() == "Start") {
        $("#btnStart span").text("Stop")
        this.toolTimeline.play();
      } else {
        $("#btnStart span").text("Start")
        this.toolTimeline.pause();
      }
    }
 
    reverse() {
      this.toolTimeline.restart();
    }



    


    
   


}
