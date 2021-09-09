import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { ChitietdonhangComponent } from '../chitietdonhang/chitietdonhang.component';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-update-acount',
  templateUrl: './update-acount.component.html',
  styleUrls: ['./update-acount.component.css']
})
export class UpdateAcountComponent implements OnInit {

  userForm: FormGroup;
  user: any;
  oder: any;
  constructor(public dialog: MatDialog,private formBuilder: FormBuilder, private userService: UserService, private tokenStorage: TokenStorageService, private productService: ProductService) { }

 async ngOnInit() {
   await this.getUserById();
   await this.getOrDerOfOser();
   console.log(this.oder);
    this.userForm = this.formBuilder.group({
      id: [''],
      fullName: [''],
      email: [''],
      phone: [''],
      address: [''],
    });
   this.userForm.get('fullName').setValue(this.user.fullName);
   this.userForm.get('email').setValue(this.user.email);
   this.userForm.get('phone').setValue(this.user.phone);
   this.userForm.get('address').setValue(this.user.address);
   this.userForm.get('id').setValue(this.user.id);
  }

  async getUserById() {
      this.user = await this.userService.getUserById(this.tokenStorage.getUser().id).toPromise();
  }

  async getOrDerOfOser() {
    this.oder = await this.productService.getOrderByUser(this.tokenStorage.getUser().id).toPromise();
  }

  
  HuyDon(status,id) {
    if(status === true) {
      alert("Bạn không thể hủy đơn hàng");
    } else {
      this.productService.cancelOder(id).subscribe(res => {
              this.getOrDerOfOser();
      })
    }
  }
   
  key:string = 'id';
  reverse: boolean =false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  updateAcount() {
    this.userService.updateUser(this.userForm.value).subscribe(res => {
      console.log(res);
      if(res) {
        alert("Cập nhật Thành Công");
      }
    })
  }

  updateProduct(item) {
      if(item.status === true) {
        alert("Bạn không thể sửa đơn hàng ");
      }
      this.openUpdateDialogDetail(item).beforeClosed().subscribe(res => {
            console.log(res);
      })
  }

  openChiTietDonHang(item) {
    return this.dialog.open(ChitietdonhangComponent, {
      width: '65%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
      idorder : item
      },
    });
  }

  openUpdateDialogDetail(item) {
    console.log(item);
    return this.dialog.open(OrdersComponent, {
      width: '65%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
      order : item
      },
    });
  }
}