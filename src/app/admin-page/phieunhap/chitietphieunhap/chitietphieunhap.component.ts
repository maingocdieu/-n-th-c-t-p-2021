import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
        res["id"] = this.phieuNhapDetails.products[0].productNoteId.goodsNoteId;
        for(let i = 0 ; i < this.phieuNhapDetails?.products.length ; i++) {
          if(this.phieuNhapDetails?.products[i].productDetail.product.id == res.productId) {
            alert("Sản phẩm này đã nhập rồi");
            return;
          }
        }
        this.productService.InsertChiTietPhieuNhap(res).subscribe (a => {
        this.getDetailPhieuNhapById(this.data.data);
        });
      })
    } else {
      this.openDialogDetail(category).afterClosed().subscribe((res)=>{
        if(res === undefined ) return;
        res["id"] = this.phieuNhapDetails.products[0].productNoteId.goodsNoteId;
        res["oldProductId"] =category.productDetail.product.id;
        this.productService.updateChiTietPhieuNhap(res).subscribe (a => {
          this.getDetailPhieuNhapById(this.data.data);
        });
      })
    }
  }

   deletectpn(category):void{
      let res= {
        id: -1,
        oldProductId: -1
      };
      res.id = category.productNoteId.goodsNoteId;
      res.oldProductId = category.productDetail.product.id
      console.log(res);
      this.productService.deleteChiTietPhieuNhap(res).subscribe (a => {
        this.getDetailPhieuNhapById(this.data.data);
      });
    
  }
}
