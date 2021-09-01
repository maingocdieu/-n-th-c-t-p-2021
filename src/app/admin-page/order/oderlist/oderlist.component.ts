import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/common/alert/alert.component';
import { ProductService } from 'src/app/_services/product.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-oderlist',
  templateUrl: './oderlist.component.html',
  styleUrls: ['./oderlist.component.css']
})
export class OderlistComponent implements OnInit {

  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  currentItem = ' Bạn không được phép xóa';
  listOrder: any;

 
  currentSelectedPage: number = 0;
  totalPages: number = 0;
  pageIndexes: Array<number> = [];
  page: number = 0;
  constructor(public dialog: MatDialog,private productService: ProductService) { }
  ngOnInit(): void {
    this.getPage();
   
  }

  getListSanPham() {
    this.productService.getListOder().subscribe((data)=> {
         this.listOrder = data;
         console.log(this.listOrder);
    })
  }

  openDialogCategory(item) {
    return this.dialog.open(OrderDetailComponent, {
      width: '70%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        chitiet: item.listOderDetail,
        idOrder: item.id,
        
      },
    });
  }
  deleteOrderList(item) {
    if(item.listOderDetail.length>0) {
      this.currentItem = "Bạn không thể xóa"
      this.alertDeleteDialog.show();
    } else {
      this.productService.deleteOrder(item.id).subscribe(res => {
        if(res == true) {
          this.getListSanPham();
        }
      });
    }
  }


  getPaginationWithIndex(index) {
  
    this.page = index;
    this.productService.getPageOder(this.page).subscribe((res) => {
      if (res === null) {
        this.listOrder = null;
      } else {
        this.listOrder = res.content;
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
   
    this.productService.getPageOder(this.page).subscribe((res) => {
      if (res === null) {
        this.listOrder = null;
      } else {
        this.listOrder = res.content;
        this.totalPages = res.totalPages;
        this.pageIndexes = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);
        this.currentSelectedPage = res.pageable.pageNumber;
      }
    });
  }



 updateStatus(id,status) {
   let  updatestatus = {
        "id": id,
        "status": !status 
      }
  this.productService.updateStatus(updatestatus).subscribe(res => {
     this.getListSanPham();
     window.location.reload();
  })
}
}