import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OderDetail } from 'src/app/model/oderdetal';
import { Oder } from 'src/app/model/order';
import { CartService } from 'src/app/_services/cart.service';
@Component({
  selector: 'app-chitietdonhang',
  templateUrl: './chitietdonhang.component.html',
  styleUrls: ['./chitietdonhang.component.css']
})
export class ChitietdonhangComponent implements OnInit {

  a= 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ChitietdonhangComponent>, private cartService: CartService) { }

  ngOnInit(): void {
      console.log(this.data);
  }

  capnhap() {
    
    this.dialogRef.close();
  }

//  themSanPham() {
//   let oder = new Oder();
//   let oderDetail = new OderDetail();
//   oderDetail.order = oder;
//   oderDetail.cartItems = this.cartService.cartItems;
//   this.productService.isertOderDetail(JSON.stringify(oderDetail)).subscribe((res) => {
//     if (res != null) {
//       alert("Bạn đã đặt hàng thành công");
//       this.cartService.totalPrice.next(0);
//       this.cartService.totalQuantity.next(0);
//       this.cartService.cartItems.length = 0;
//       this.router.navigateByUrl('');
//     }
//   })

//  }

}
