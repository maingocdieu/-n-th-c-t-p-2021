import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { CustomalertComponent } from 'src/app/common/customalert/customalert.component';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products = {
    nameProduct: '',
    categoryId: null,
    price: null,
    pageSize: 0,
    page: 0,
  }
  listProduct: any;
  currentSelectedPage: number = 0;
  valueRole = '-1';
  totalPages: number = 0;
  pageIndexes: Array<number> = [];

  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: CustomalertComponent;
  currentItem = 'Sản phẩm thạm thời hết hàng';
  constructor(private activateRoute: ActivatedRoute, private productService: ProductService,
  private router: Router, private cartService: CartService) { }
  async ngOnInit() {
    await this.getProduct();
  }

  async getProduct() {
    this.activateRoute.paramMap.subscribe(async params => {
      const id = params.get('id');
      this.listProduct = await this.productService.getProductByCategory(id).toPromise();
      console.log(this.listProduct);
    });
  }

  getDetailProduct(id) {
    this.router.navigateByUrl("product/"+ id)
  }

  // addToCart(theProduct: any) {

  //   const theCartItem = new CartItem(theProduct);
  //   if(theCartItem.quantity >theCartItem.soLuongTon) {
  //       this.alertDeleteDialog.show();
  //       return;
  //   }
   
  //   this.cartService.addToCart(theCartItem);
  // }

 
}
