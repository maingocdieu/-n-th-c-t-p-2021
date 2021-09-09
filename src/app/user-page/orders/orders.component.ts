import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  userForm: FormGroup;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<OrdersComponent>,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: [this.data.order.user.email,],
      fullName: [this.data.order.user.fullName,],
      address: [this.data.order.diachi,],
      phone: [this.data.order.sdt,],

      hinhthucgiaohang: [this.data.order.hinhThucGiaoHang,],
    });
  }



}
