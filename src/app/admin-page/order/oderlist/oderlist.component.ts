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
  constructor(public dialog: MatDialog,private productService: ProductService) { }
  ngOnInit(): void {
    this.getListSanPham();
    console.log("Đâ");
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
        data: item,
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