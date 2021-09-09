import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/common/alert/alert.component';
import { CartItem } from 'src/app/model/cart-item';
import { OderDetail } from 'src/app/model/oderdetal';
import { Oder } from 'src/app/model/order';
import { CartService, ICartInfor } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  subCartInfo: Subscription
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  CartInfo: ICartInfor[];
  checkOutForm: FormGroup;
  user: any;

  @ViewChild('alertDeleteDialog', { static: false })
  alertDeleteDialog: AlertComponent;
  currentItem = ' Bạn không được phép xóa';
  constructor(private cartService: CartService, private formBuilder: FormBuilder,
    private productService: ProductService, private tokenStorage: TokenStorageService, private router: Router, private userService: UserService) {
  }

  async ngOnInit() {

   await this.getUserById();
    let temp = this.cartService.getTotal();
    this.totalPrice = temp.totalPrice;
    this.totalQuantity = temp.totalQuantity;
    this.checkOutForm = this.formBuilder.group({
      nameKhachHang: [this.user.fullName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
      address: [this.user.address, Validators.required],
      hinhthucgiaohang: ['', Validators.required]
    });

  }

  async getUserById() {
    this.user = await this.userService.getUserById(this.tokenStorage.getUser().id).toPromise();
}

  get f() { return this.checkOutForm.controls; }


  get nameKhachHang() {
    return this.checkOutForm.get('nameKhachHang');
  }

  get phone() {
    return this.checkOutForm.get('phone');
  }

  get email() {
    return this.checkOutForm.get('email');
  }

  get address() {
    return this.checkOutForm.get('address');
  }

  get hinhthucgiaohang() {
    return this.checkOutForm.get('hinhthucgiaohang');
  }
  onSubmit() {


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
    this.checkOutForm.invalid;
    if (this.checkOutForm.invalid) {
      this.checkOutForm.markAllAsTouched();
      return;
    }

    let oder = new Oder();
    oder.diaChi = this.address.value;
    oder.email = this.email.value;
    oder.sdt = this.phone.value
    oder.nameUser = this.nameKhachHang.value
    oder.totalPrice = this.totalPrice;
    oder.totalQuantity = this.totalQuantity;
 
    oder.hinhthucgiaohang = this.hinhthucgiaohang.value;
    let oderDetail = new OderDetail();
    oderDetail.order = oder;
    oderDetail.cartItems = this.cartService.cartItems;
    oderDetail.userId = this.tokenStorage.getUser().id;
    this.productService.insertOder(JSON.stringify(oderDetail)).subscribe((res) => {
      if (res != null) {
        alert("Bạn đã đặt hàng thành công");
        this.cartService.totalPrice.next(0);
        this.cartService.totalQuantity.next(0);
        this.cartService.cartItems.length = 0;
        this.router.navigateByUrl('');
      }
    })

  }

}
