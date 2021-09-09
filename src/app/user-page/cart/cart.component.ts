import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomalertComponent } from 'src/app/common/customalert/customalert.component';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/_services/cart.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: CustomalertComponent;
  currentItem = ' Bạn không được phép xóa';
  constructor(private cartService: CartService, private router : Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    console.log(this.cartItems);
    let temp = this.cartService.getTotal();
    this.totalPrice = temp.totalPrice;
    this.totalQuantity = temp.totalQuantity;
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe( 
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }
 

  incrementQuantity(theCartItem: CartItem) {

    if(theCartItem.quantity >theCartItem.soLuongTon) {
      this.currentItem = "Số lượng tồn không đủ";
      this.alertDeleteDialog.show();
      return;

    }
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    if(theCartItem.quantity > 0)
    {
      this.cartService.decrementQuantity(theCartItem);
    }
  
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }

  checkout() {
    if (this.tokenStorage.getUser()?.id === undefined) {
      this.currentItem = "Bạn cần đăng nhập trước khi mua hàng";
      this.alertDeleteDialog.show();
      return;
    }

    if (this.cartService.cartItems.length == 0) {
      this.currentItem = "Giỏ hàng trống"
      this.alertDeleteDialog.show();
      return;

    }
    this.router.navigateByUrl("checkout");
}

tieptuc() {
  this.router.navigateByUrl('');
}
}
