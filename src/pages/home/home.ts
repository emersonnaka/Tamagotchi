import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private vPet: VPet;

  constructor(public navCtrl: NavController) {
    this.vPet = new VPet(70, 100, 50, 100, 'normal', false);
  }

  play() {
    this.vPet.setHappy();
  }

  toilet() {
  	this.vPet.setHealth();
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
    
    this.happy -= this.happyRate * (deltaTime / 1000);
    this.health -= this.healthRate * (deltaTime / 1000);
    this.hunger -= this.hungerRate * (deltaTime / 1000);
    this.energy -= this.energy * (deltaTime / 1000);
    if(this.energy < 0)
      this.energy = 0;

    this.updateState();

    if(this.state == 'sad') {
      this.happy -= Math.floor(Math.random() * 10);
    } else if(this.state == 'sick') {
      this.health -= Math.floor(Math.random() * 10);
    } else if(this.state == 'tired') {
      this.hunger -= Math.floor(Math.random() * 10);
    } else if(this.state == 'sleep') {
      this.energy += this.energy * deltaTime;

    }

  }

  updateState() {
    if(this.happy < 25)
      this.state = 'sad';
    else if(this.health < 25 || this.hunger > 100)
      this.state = 'sick';
    else if(this.energy < 20) {
      this.state = 'tired';
      if(this.energy == 0) {
        this.sleep = true;
        document.getElementById('content').style.background = "#336600";
      }
    }
    if(this.happy <= 0 || this.health <= 0 || this.hunger < 0 || this.hunger > 130) {
      this.state = 'dead';
      alert("Your vPet is dead!");
    }

    this.updateText("state-text", undefined ,this.state);
  }

  getHappy(): number {
    return this.happy;
  }

  setHappy() {
    this.happy += this.happyRate;
    this.energy -= this.energyRate;
    if(this.energy < 0)
      this.energy = 0;
    this.hunger -= this.hungerRate;
    this.health -= this.healthRate;
    this.updateState();
    this.updateText("happy-text", this.happy);
    this.updateText("energy-text", this.energy);
    this.updateText("hunger-text", this.hunger);
    this.updateText("health-text", this.health);
  }

  getHealth(): number {
    return this.health;
  }

  setHealth() {
    if(this.state == 'sick') {
      this.health += this.healthRate;
      this.happy -= this.happyRate;
      this.updateText("health-text", this.health);
      this.updateText("happy-text", this.happy);
      this.updateState();
    }
  }

  getHunger(): number {
    return this.hunger;
  }

  setHunger() {
    this.hunger += this.hungerRate;
    this.energy += this.energyRate;
    if(this.energy < 0)
      this.energy = 0;
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
  }

  getState(): string {
    return this.state;
  }

  updateText(idText: string, value?: number, state?: string) {
    document.getElementById(idText).innerHTML = "";
    if(value)
      document.getElementById(idText).innerHTML = value + '/' + 100;
    else
      document.getElementById(idText).innerHTML = this.state;
  }
}