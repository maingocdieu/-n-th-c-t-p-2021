import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AlertComponent } from 'src/app/common/alert/alert.component';
import { ProductService } from 'src/app/_services/product.service';
import { ChitietphieunhapComponent } from '../chitietphieunhap/chitietphieunhap.component';

@Component({
  selector: 'app-listphieunhap',
  templateUrl: './listphieunhap.component.html',
  styleUrls: ['./listphieunhap.component.css']
})
export class ListphieunhapComponent implements OnInit {
  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  currentItem = ' Bạn không được phép xóa';
  constructor(private productService: ProductService, public dialog: MatDialog) { }

  listPhieuNhap : any;
 async ngOnInit() {
    await  this.getListPhieuNhap();
  }

 async getListPhieuNhap() {
  this.listPhieuNhap =  await this.productService.getListPhieuNhap().toPromise();
  console.log(this.listPhieuNhap);
  }

  openDialogDetail(item) {
    return this.dialog.open(ChitietphieunhapComponent, {
      width: '70%',
      height: '70%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        data: item,
      },
    });
  }


  xoaPhieuNhap(item) {
    {
      this.productService.deletePn(item.id).subscribe(res => {
        if(res == true) {
          this.getListPhieuNhap();
        } else {
          this.currentItem = "Bạn không thể xóa"
        this.alertDeleteDialog.show();
        }
      });
    }
  }
}
