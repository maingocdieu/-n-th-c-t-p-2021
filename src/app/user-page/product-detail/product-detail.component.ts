import { Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomalertComponent } from 'src/app/common/customalert/customalert.component';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  quantity = 0;
  listProductRelated: any;
  products: any;
  listColorOfProduct: any;
  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: CustomalertComponent;
  currentItem = 'Sản phẩm thạm thời hết hàng';
  constructor(private activateRoute: ActivatedRoute, private productService: ProductService,
    private router: Router, public cartService: CartService, private tokenStorage: TokenStorageService) { }

  async ngOnInit() {
    await this.getProduct();
    await this.getProductRelated();
    this.products = this.listProductRelated.content;
  }

  async getProductRelated() {
    this.listProductRelated = await this.productService.getProductByCategory(this.product.category.id).toPromise();
  }

  async getProduct() {
    let id: any;
    await this.activateRoute.paramMap.subscribe(params => {
      id = params.get('id');
    });

    this.product = await this.productService.getById(id).toPromise();
  }

  addToCart(itemDetail: any, product: any) {

    if (this.tokenStorage.getUser()?.id === undefined) {
      alert("Bạn cần đăng nhập để mua hàng");
      this.router.navigateByUrl("login");
      return;
    }
    const theCartItem = new CartItem(itemDetail, product);
    
    if(theCartItem.quantity >theCartItem.soLuongTon) {
        this.alertDeleteDialog.show();
        return;
    }
    this.cartService.addToCart(theCartItem);
  }



  getDetailProduct(id) {
    this.router.navigateByUrl("product/"+ id);
    this.ngOnInit();
  // window.location.replace("product/"+ id);
  }

  muangay() {
    this.router.navigateByUrl('/cart');
  }

  tieptuc() {
    this.router.navigateByUrl('');
   
  }
  
}
