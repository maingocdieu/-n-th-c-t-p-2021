import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/common/alert/alert.component';
import { MyDialogComponent } from 'src/app/common/my-dialog/my-dialog.component';
import { ProductService } from 'src/app/_services/product.service';
import { ProductDetailService } from 'src/app/_services/productdetail.service';
import { OrderDetailComponent } from '../../order/order-detail/order-detail.component';
import { UpdatePNComponent } from '../update-pn/update-pn.component';

@Component({
  selector: 'app-chitietphieunhap',
  templateUrl: './chitietphieunhap.component.html',
  styleUrls: ['./chitietphieunhap.component.css']
})
export class ChitietphieunhapComponent implements OnInit {
  listPhieuNhap : any;
  @ViewChild('confirmDeleteDialog', { static: false })
  confirmDeleteDialog: MyDialogComponent;
  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  currentItem = '';
  item: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,private productDetailService: ProductDetailService,
    public dialogRef: MatDialogRef<ChitietphieunhapComponent>,  public dialog: MatDialog, private productService: ProductService) { }
  phieuNhapDetails: any;

  a: any;
  async ngOnInit() {
   await this.getDetailPhieuNhapById(this.data.data);
   console.log(this.phieuNhapDetails);
  }

  
  async getDetailPhieuNhapById(id) {
  this.phieuNhapDetails=  await this.productService.getDetailPhieuNhapById(id).toPromise()
  
  }

  openDialogDetail(item) {

   
    return this.dialog.open(UpdatePNComponent, {
      width: '40%',
      height: '40%',
      panelClass: 'custom-modalbox',
      autoFocus: false,
      data: {
        data: item,
      },
    });
  }

  async getAllProduct() {
    this.phieuNhapDetails = await this.productDetailService.getProductDetail().toPromise();

  }

  
  UpdatePhieuNhap(category):void{
    if(category == null){
      this.openDialogDetail(category).afterClosed().subscribe((res)=>{
        if(res === undefined ) return;
        res["id"] = this.data.data;
        console.log(this.phieuNhapDetails);
        for(let i = 0 ; i < this.phieuNhapDetails?.products.length ; i++) {
          if(this.phieuNhapDetails?.products[i].productNoteId.productId == res.productId) {
            this.currentItem ="Đã tồn tại sản phẩm này rồi";
            this.alertDeleteDialog.show();
            return;
          }
        }
        this.productService.InsertChiTietPhieuNhap(res).subscribe (a => {
        this.getDetailPhieuNhapById(this.data.data);
        this.currentItem ="Thêm thành công";
        this.alertDeleteDialog.show();
        });
      })
    } else {
      this.openDialogDetail(category).afterClosed().subscribe((res)=>{
        if(res === undefined ) return;
        res["id"] = this.phieuNhapDetails.products[0].productNoteId.goodsNoteId;
        res["oldProductId"] =category.productNoteId.productId;
        this.productService.updateChiTietPhieuNhap(res).subscribe (a => {
          if(a == true) {
            this.currentItem ="Cập nhật thành công";
            this.alertDeleteDialog.show();
            this.getDetailPhieuNhapById(this.data.data);
          } else {
            this.currentItem ="Cập nhật thất bại";
            this.alertDeleteDialog.show();
          }
        });
      })
    }
  }

  showConfirmDialog(item) {
    this.confirmDeleteDialog.show();
    this.item = item;
  }

   deletectpn():void{
      let res= {
        id: -1,
        oldProductId: -1
      };

      console.log(this.item)
      res.id = this.item.productNoteId.goodsNoteId;
      res.oldProductId = this.item.productNoteId.productId
      this.productService.deleteChiTietPhieuNhap(res).subscribe (a => {
        this.getDetailPhieuNhapById(this.data.data);
        this.confirmDeleteDialog.close();
      });
  }
}
