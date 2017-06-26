import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  feed() {
  	console.log("Aumenta hunger")
  }

  toilet() {
  	console.log("Toilet")
  }

  play() {
  	console.log("Play")
  }

  health() {
  	console.log("Health")
  }

  ligth() {
  	console.log("Ligth")
  }

}
