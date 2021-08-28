import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private productDetailService: ProductDetailService,
  public dialogRef: MatDialogRef<ProductDetailComponent>,  public dialog: MatDialog, private productService: ProductService) { }

 async ngOnInit() {

  

   await this.findById();
   console.log(this.product);
   
  }


 async findById() {
    this.product= await this.productService.getById(this.data.data).toPromise();
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

  UpdateProdcutDettail(productDetail,id):void{
    if(productDetail == null){
      this.openUpdateDialogDetail(productDetail, "Thêm",id).afterClosed().subscribe((res)=>{
        if(res === undefined ) return;
      
        let a = [];
        a.push(res);
    
        this.productDetailService.createProductDetail(a).subscribe(res => {
          console.log(res);
        })

      })
    } else {
      this.openUpdateDialogDetail(productDetail,"Cập nhật", id).afterClosed().subscribe((res)=>{
        if(res === undefined ) return;
       
        res["oldProducDetailtId"]=id;
        this.productDetailService.updateProductDetail(res).subscribe((res) => {
            console.log(res);
        
          if(res === false) {
            alert("Theem kong thanh cong");
          }
        })
       
       
      })
    }
  }

 
}
