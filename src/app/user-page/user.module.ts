import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPageRoutingModule } from './user-page.routing.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UserPageComponent } from './user-page.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CardStatusComponent } from './card-status/card-status.component';
import { CustomalertComponent } from '../common/customalert/customalert.component';
import { SearchComponent } from './search/search.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { UpdateAcountComponent } from './update-acount/update-acount.component';
import { OrdersComponent } from './orders/orders.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule } from '@angular/material/dialog';
import { ChitietdonhangComponent } from './chitietdonhang/chitietdonhang.component';



@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    HeaderComponent,
    ProductListComponent,
    ProductDetailComponent,
    CategoryComponent,
    CardStatusComponent,
    HomeComponent,
    CustomalertComponent,
    UserPageComponent ,
    SearchComponent,   
    ProductSearchComponent,
    UpdateAcountComponent,
    OrdersComponent,
    ChitietdonhangComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserPageRoutingModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    FormsModule
  ]
})
export class UserModule { }
