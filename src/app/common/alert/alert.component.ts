import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  isDisplaying = false;
  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.isDisplaying = true;
  }

  close() {
    this.isDisplaying = false;
  }

}