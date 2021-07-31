import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  constructor(private productService: ProductService) {
    
   }

  products: any;

  ngOnInit(): void {
   
    this.productService.readListProduct().subscribe((res) => {
      this.products =res;
     })
  }

}
