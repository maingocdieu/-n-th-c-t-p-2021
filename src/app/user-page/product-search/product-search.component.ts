import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomalertComponent } from 'src/app/common/customalert/customalert.component';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  products: any;
  currentCategoryId: number;
  searchMode: any;
  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: CustomalertComponent;
  currentItem = 'Sản phẩm thạm thời hết hàng';
  constructor(private activateRoute: ActivatedRoute , private productService: ProductService, private cartService: CartService, private router: Router) { }
  ngOnInit(): void {
      this.handleSearchProducts();
  }
  handleSearchProducts() {
    const theKeyword: string = this.activateRoute.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data.content;
        console.log(this.products);
      }
    )
  }

  getDetailProduct(id) {
    this.router.navigateByUrl("product/"+ id)
  }

}
