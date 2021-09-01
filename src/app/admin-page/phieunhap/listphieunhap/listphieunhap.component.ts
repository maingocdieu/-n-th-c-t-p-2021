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

  listPhieuNhp: any;
  currentSelectedPage: number = 0;
  totalPages: number = 0;
  pageIndexes: Array<number> = [];
  page: number = 0;

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  listPhieuNhap : any;
 ngOnInit() {
   
    this.getPage();
  }

 async getListPhieuNhap() {
  this.listPhieuNhap =  await this.productService.getListPhieuNhap().toPromise();
  
  }

  openDialogDetail(item) {
    console.log("Day la "+ item)
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


  getPaginationWithIndex(index) {
  
    this.page = index;
    this.productService.getPagePhieuNhap(this.page).subscribe((res) => {
      if (res === null) {
        this.listPhieuNhap = null;
      } else {
        this.listPhieuNhap = res.content;
        this.totalPages = res.totalPages;
        this.pageIndexes = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);
        this.currentSelectedPage = res.pageable.pageNumber;
      }
    });
  }

  active(index: number) {
    if (this.currentSelectedPage == index) {
      return {
        active: true,
      };
    } else {
      return { active: false };
    }
  }

  nextClick() {
    alert(this.currentSelectedPage)
    if (this.currentSelectedPage < this.totalPages - 1) {
      this.page = this.page + 1;
      this.getPage();
    }
  }

  previousClick() {
    alert(this.currentSelectedPage)
    if (this.currentSelectedPage > 0) {
      this.page = this.page - 1;
      this.getPage();
      window.location.reload();
    }
  }
  getPage() {
   
    this.productService.getPagePhieuNhap(this.page).subscribe((res) => {
      if (res === null) {
        this.listPhieuNhap = null;
      } else {
        this.listPhieuNhap = res.content;
        this.totalPages = res.totalPages;
        this.pageIndexes = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);
        this.currentSelectedPage = res.pageable.pageNumber;
      }
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
