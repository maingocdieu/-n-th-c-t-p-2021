import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorService } from 'src/app/_services/color.service';
import { ProductService } from 'src/app/_services/product.service';
import { ProductDetailService } from 'src/app/_services/productdetail.service';
import { SizeService } from 'src/app/_services/size.service';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-insert-product-detail',
  templateUrl: './insert-product-detail.component.html',
  styleUrls: ['./insert-product-detail.component.css']
})
export class InsertProductDetailComponent implements OnInit {

 
  items = [];
  title = 'form';
  productDetailForm: FormGroup;
  isValidFormSubmitted = null;
  messageSucess = false;
  listProduct: any;
  listColor :any;
  listSize: any;
  listSupplier: any;

  tongTien = 1;
  gia = 0;

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
     private sizeService: SizeService, private colorService: ColorService,
     private supplierService: SupplierService, private productDetailService: ProductDetailService ) { }

 async ngOnInit() {
    this.productDetailForm = this.formBuilder.group({
      productDetail: this.formBuilder.array(
        [this.createProducrDetailFormGroup()],
        [Validators.required])
    });
    await this.getAllProduct();
    await this.getAllSize();
    await this.getAllSupplier();
    await this.getAllColor();

    console.log(this.listProduct)
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


  createProducrDetailFormGroup() {
    return this.formBuilder.group({
      colorId: ['-1', [electionValidate]],
      sizeId: ['-1', [electionValidate]],
      productId: ['-1', [electionValidate]],
      supllierId: ['-1', [electionValidate]],
      price: ['', [Validators.required, Validators.min(0)]]
      
    })
  }
 
  addItem() {
    this.items.length++;
  }

  get productDetail(): FormArray {
    return this.productDetailForm.get('productDetail') as FormArray;
  }
 
  addProductDetail() {
    this.isValidFormSubmitted = true;
    let fg = this.createProducrDetailFormGroup();
    this.productDetail.push(fg);
  }

  deleteProductDetail(idx: number) {
    if(this.productDetail.length >1) {
      this.productDetail.removeAt(idx);
    }
  
  }
 
  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.productDetailForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.items = this.productDetailForm.value.productDetail;


  
    
    this.productDetailService.createProductDetail(JSON.stringify(this.items)).subscribe((data) => {
      
      if (data != null) {
        this.messageSucess = true;
        this.productDetailForm.reset();
      } else {
        alert("Them that bai");
      }
    },
    (error) => {
      alert("Có sản phẩm giống nhau trên giỏ hàng");
      return;
    });
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
