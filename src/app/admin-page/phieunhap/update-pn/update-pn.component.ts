import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-update-pn',
  templateUrl: './update-pn.component.html',
  styleUrls: ['./update-pn.component.css']
})
export class UpdatePNComponent implements OnInit {
  listProduct: any;
  detailForm: FormGroup;
  constructor( private productService: ProductService,  private formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
    this.detailForm = this.formBuilder.group({
      productId: ['-1', [electionValidate]],
      amount: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(21)]],
    });
    this.getAllProduct();
  
  }
  async getAllProduct() {
    this.listProduct = await this.productService.readListProduct().toPromise();
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