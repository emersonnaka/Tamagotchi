import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private vPet: VPet;

  constructor(public navCtrl: NavController) {
    this.vPet = new VPet(70, 100, 50, 100, "normal", false);
  }

  play() {
    this.vPet.setHappy();
  }

  toilet() {
  	this.vPet.setToilet();
  }

  feed() {
    this.vPet.setHunger();
  }

  health() {
  	this.vPet.setHealth();
  }

  ligth() {
  	this.vPet.setLight();
  }

  update() {
    this.vPet.update(500);
  }
}

class VPet {

  readonly happyRate = 10;
  readonly healthRate = 5;
  readonly hungerRate = 10;
  readonly energyRate = 5;

  private happy: number;
  private health: number;
  private hunger: number;
  private energy: number;
  private state: string;
  private sleep: boolean;

  constructor(happy: number, health: number, hunger: number,
  energy: number, state: string, sleep: boolean) {
    this.happy = happy;
    this.health = health;
    this.hunger = hunger;
    this.energy = energy;
    this.state = state;
    this.sleep = sleep;
  }

  update(deltaTime) {
    
    this.happy -= this.happyRate * (deltaTime / 100);
    this.health -= this.healthRate * (deltaTime / 100);
    this.hunger -= this.hungerRate * (deltaTime / 100);
    this.energy -= this.energy * (deltaTime / 100);

    this.updateState();

    if(this.state == "sad") {
      this.happy -= Math.floor(Math.random() * 10);
    } else if(this.state == "sick") {
      this.health -= Math.floor(Math.random() * 10);
    } else if(this.state == "tired") {
      this.hunger -= Math.floor(Math.random() * 10);
    } else if(this.state == "sleep") {
      this.energy = this.addIncrement(this.energy, this.energy * deltaTime);
    }

    this.updateText("happy-text", this.happy);
    this.updateText("health-text", this.health);
    this.updateText("hunger-text", this.hunger);
    this.updateText("energy-text", this.energy);

  }

  updateState() {
    if(this.happy < 25) {
      if(this.state != "sad") {
        alert("Your vPet is sad!");
      }
      this.state = "sad";
    } else if(this.health < 25 || this.hunger > 100) {
      if(this.state != "sick") {
        alert("Your vPet is sick!");
      }
      this.state = "sick";
    } else if(this.energy < 20) {
      if(this.state != "tired") {
        alert("Your vPet is tired");
      }
      this.state = "tired";

      if(this.energy == 0) {
        this.sleep = true;
        alert("Your vPet is very tired. It is going to sleep!");
        document.getElementById('content').style.background = "#336600";
      }
    }

    if(this.happy <= 0 || this.health <= 0 || this.hunger < 0 || this.hunger > 130) {
      this.state = "dead";
      alert("Your vPet is dead!");
    }

    if(this.state == "sad") {
      if(this.happy <= 25)
        this.state = "normal";
    } else if(this.state == "sick") {
      if(this.health > 75 && this.hunger <= 100)
        this.state = "normal";
    } else if(this.state == "tired") {
      if(this.energy >= 20)
        this.state = "normal";
    }

    this.updateGraphics();
    this.updateText("state-text", undefined ,this.state);
  }

  setHappy() {
    this.happy = this.addIncrement(this.happy, this.happyRate);
    this.energy -= this.energyRate;
    this.hunger -= this.hungerRate;
    this.health -= this.healthRate;
    this.updateState();
    this.updateText("happy-text", this.happy);
    this.updateText("energy-text", this.energy);
    this.updateText("hunger-text", this.hunger);
    this.updateText("health-text", this.health);
  }

  setToilet() {
    this.energy = this.addIncrement(this.energy, this.energyRate);
    this.health = this.addIncrement(this.health, this.healthRate * 10);
    this.updateState();
    this.updateText("energy-text", this.energy);
    this.updateText("health-text", this.health);
  }

  setHealth() {
    if(this.state == 'sick') {
      this.health = this.addIncrement(this.health, 25);
      this.happy -= this.happyRate;
      this.updateText("health-text", this.health);
      this.updateText("happy-text", this.happy);
      this.updateState();
    } else {
      alert("Your vPet isn't sick!");
    }
  }

  setHunger() {
    this.hunger += this.hungerRate;
    this.energy = this.addIncrement(this.energy, this.energyRate);
    if(this.hunger > 90)
      this.health -= this.healthRate;
    this.updateState();
    this.updateText("hunger-text", this.hunger);
    this.updateText("energy-text", this.energy);
    this.updateText("health-text", this.health);
  }

  setLight() {
    if(this.sleep) {
      this.sleep = false;
      document.getElementById('content').style.background = "#ffffff";
    } else {
      this.sleep = true;
      document.getElementById('content').style.background = "#336600";
    }
    this.updateGraphics();
  }

  addIncrement(value: number, increment: number): number {
    let result = value + increment;
    if(result >= 100)
      return 100;
    return result;
  }

  updateText(idText: string, value?: number, state?: string) {
    document.getElementById(idText).innerHTML = "";
    if(value)
      document.getElementById(idText).innerHTML = value + '/' + 100;
    else
      document.getElementById(idText).innerHTML = this.state;
  }

  updateGraphics() {
    document.getElementById("graphic").innerHTML = "";
    if(this.state == "normal")
      document.getElementById("graphic").innerHTML = "<img src=\"../../assets/Happy.gif\"/>";
    else if(this.state == "sad")
      document.getElementById("graphic").innerHTML = "<img src=\"../../assets/Sad.gif\"/>";
    else if(this.state == "sick")
      document.getElementById("graphic").innerHTML = "<img src=\"../../assets/Sick.gif\"/>";
    else if(this.state == "dead")
      document.getElementById("graphic").innerHTML = "<img src=\"../../assets/Dead.png\"/>";
    if(this.sleep)
      document.getElementById("graphic").innerHTML = "<img src=\"../../assets/Sleeping.gif\"/>";
  }
}