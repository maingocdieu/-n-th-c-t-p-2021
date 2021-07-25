import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  quantity = 0;
  constructor(private activateRoute: ActivatedRoute, private productService: ProductService,
    private router: Router) { }

  async ngOnInit() {
    await this.getProduct();
    console.log(this.product);
  }

  async getProduct() {
    let id: any;
    await this.activateRoute.paramMap.subscribe(params => {
      id = params.get('id');
    });

  this.product = await this.productService.getById(id).toPromise();
 
  }

  inCrease() {
       this.quantity++;
       
  }

  deCrease() {
      
      if(this.quantity < 1) {
        return;
      }
      this.quantity--;
  }
}
