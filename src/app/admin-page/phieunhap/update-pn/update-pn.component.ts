import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/_services/product.service';
import { ProductDetailService } from 'src/app/_services/productdetail.service';

@Component({
  selector: 'app-update-pn',
  templateUrl: './update-pn.component.html',
  styleUrls: ['./update-pn.component.css']
})
export class UpdatePNComponent implements OnInit {
  listProduct: any;
  detailForm: FormGroup;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UpdatePNComponent>,private productService: ProductService,  private formBuilder: FormBuilder, private productDetailService: ProductDetailService) { }
  

  ngOnInit(): void {
  
    
    if(this.data.data === null) {
      console.log( "Dieu")
      this.detailForm = this.formBuilder.group({
        productId: ['-1', [electionValidate]],
        amount: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.min(21)]],
      });
    } else {
      this.detailForm = this.formBuilder.group({
        productId: [this.data.data.productDetail.product.id, [electionValidate]],
        amount: [this.data.data.amount, [Validators.required]],
        price: [this.data.data.price, [Validators.required, Validators.min(21)]],
      });
    }
    
    this.getAllProduct();

   
  
  }
  async getAllProduct() {
    this.listProduct = await this.productDetailService.getProductDetail().toPromise();
  }
  get f() { 
    return this.detailForm.controls; }
}

function electionValidate(control: AbstractControl): { [key: string]: any } | null {
  const product: string = control.value;
  if (product !== '-1') {
    return null;
  } else {
    return { 'producterrow': true };
  }

}