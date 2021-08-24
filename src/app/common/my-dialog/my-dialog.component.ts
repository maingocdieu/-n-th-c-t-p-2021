import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {

  @Output() yesClicked = new EventEmitter()
  

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

  onYesBtnClicked() {
    this.yesClicked.emit(0);
  }

}
