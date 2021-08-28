import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorService } from 'src/app/_services/color.service';
import { ProductService } from 'src/app/_services/product.service';
import { ProductDetailService } from 'src/app/_services/productdetail.service';
import { SizeService } from 'src/app/_services/size.service';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  listProduct: any;
  listColor :any;
  listSize: any;
  listSupplier: any;
  productDetailForm: FormGroup;
  isValidFormSubmitted = true;
  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private sizeService: SizeService, private colorService: ColorService,
    private supplierService: SupplierService, private productDetailService: ProductDetailService,
    
    @Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<UpdateProductComponent>) { }

  async ngOnInit() {
    
    console.log(this.data)
    if(this.data.data === null) {

      console.log(this.data.id)
      this.productDetailForm = this.formBuilder.group({
        colorId: ['-1', [electionValidate]],
        sizeId: ['-1', [electionValidate]],
        productId: [this.data.idProdut, [electionValidate]],
        supllierId: ['-1', [electionValidate]],
        price: ['', [Validators.required, Validators.min(0)]]
      });
    } else {
      this.productDetailForm = this.formBuilder.group({
      colorId: [this.data.data.color.id, [electionValidate]],
      sizeId: [this.data.data.size.id, [electionValidate]],
      productId: [this.data.data.id, [electionValidate]],
      supllierId: [this.data.data.supplier.id, [electionValidate]],
      price: [this.data.data.price, [Validators.required, Validators.min(0)]]
      });
    }
    await this.getAllProduct();
    await this.getAllSize();
    await this.getAllSupplier();
    await this.getAllColor();

  }

  async getAllProduct() {
    this.listProduct = await this.productService.readListProduct().toPromise();
  }

  async getAllColor() {
    this.listColor = await this.colorService.readAllColor().toPromise();
  }

  async getAllSize() {
    this.listSize = await this.sizeService.readAllSize().toPromise();
  }

  async getAllSupplier() {
    this.listSupplier = await this.supplierService.readAllSupplier().toPromise();
  }


}

function electionValidate(control: AbstractControl): { [key: string]: any } | null {
  const product: string = control.value;
  if (product !== '-1') {
    return null;
  } else {
    return { 'producterrow': true };
  } 
}
