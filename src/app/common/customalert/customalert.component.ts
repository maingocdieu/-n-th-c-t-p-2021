import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customalert',
  templateUrl: './customalert.component.html',
  styleUrls: ['./customalert.component.css']
})
export class CustomalertComponent implements OnInit {

  @Input() item = '';
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
