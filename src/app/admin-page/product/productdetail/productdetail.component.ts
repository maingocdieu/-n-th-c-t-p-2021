import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/common/alert/alert.component';
import { ProductDetailComponent } from 'src/app/user-page/product-detail/product-detail.component';
import { ProductService } from 'src/app/_services/product.service';
import { ProductDetailService } from 'src/app/_services/productdetail.service';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  product: any;
  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  currentItem = ' Bạn không được phép xóa';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productDetailService: ProductDetailService,
    public dialogRef: MatDialogRef<ProductDetailComponent>, public dialog: MatDialog, private productService: ProductService) { }

  async ngOnInit() {
    await this.findById();
  }


  async findById() {
    this.product = await this.productService.getById(this.data.data).toPromise();

    console.log(this.product)
  }


  openUpdateDialogDetail(item, btn, id) {
    console.log(item);
    return this.dialog.open(UpdateProductComponent, {
      width: '65%',
      height: '30%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        data: item,
        button: btn,
        idProdut: id
      },
    });
  }

  deleteDetail(id) {
    
      this.productDetailService.deleteDetail(id).subscribe(res => {
          if(res == false) {
            alert("bạn không thể xóa");
            return;
          } else {
            alert("Xoas thanh cong");
          }
      } );
  }



  UpdateProdcutDettail(productDetail, id, idProductDetail): void {
    if (productDetail == null) {
      this.openUpdateDialogDetail(productDetail, "Thêm", id).afterClosed().subscribe((res) => {
        if (res === undefined) return;
        let a = [];
        a.push(res);
        this.productDetailService.createProductDetail(a).subscribe(res => {
          if (res == false) {
            this.currentItem = "Thêm thất bại";
            this.alertDeleteDialog.show();
          } else {
            this.currentItem = "Cập nhật không  thành  công";
            this.alertDeleteDialog.show();
            this.findById();
          }
        })
      })
    } else {
      this.openUpdateDialogDetail(productDetail, "Cập nhật", id).afterClosed().subscribe((res) => {
        if (res === undefined) return;
        res["oldProducDetailtId"] =idProductDetail;
        this.productDetailService.updateProductDetail(res).subscribe((res) => {
          if(res == false) {
            this.currentItem = "Cập nhật thất bại";
            this.alertDeleteDialog.show();
            return;
          }
          this.currentItem = "Cập nhật thành công";
          this.alertDeleteDialog.show();
          this.findById();
        })
      })
    }
  }


}
