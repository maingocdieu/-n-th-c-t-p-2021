import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
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



@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    HeaderComponent,
    ProductListComponent,
    ProductDetailComponent,
    CategoryComponent,
    HomeComponent,

    UserPageComponent    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserPageRoutingModule
  ]
})
export class UserModule { }
