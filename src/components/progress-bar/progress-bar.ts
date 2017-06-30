import { Component } from '@angular/core';

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  private p: number;
  private bar;

  constructor(p: number) {
    console.log('Hello ProgressBarComponent Component');
    this.p = p;
    this.bar = <HTMLElement>document.querySelectorAll('#prog-bar > .progress-bar')[0];
    this.update();
  }

  private update() {
  	this.bar.style.width = this.p + '%';
  }

  countup() {
  	if (this.p < 100) { this.p += 10; }
    this.update();
  }

  countdown() {
  	if (0 < this.p) { this.p -= 10; }
    this.update();
  }

}