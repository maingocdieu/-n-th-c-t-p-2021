import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './user-page/header/header.component';
import { FooterComponent } from './user-page/footer/footer.component';
import { ProductComponent } from './user-page/product/product.component';
import { CheckoutComponent } from './user-page/checkout/checkout.component';
import { CartComponent } from './user-page/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UerAdminComponent } from './admin-page/uer-admin/uer-admin.component';
import { ProductAdminComponent } from './admin-page/product-admin/product-admin.component';
import { HeaderAdminComponent } from './admin-page/header-admin/header-admin.component';
import { FooterAdminComponent } from './admin-page/footer-admin/footer-admin.component';
import { AdminSidebarComponent } from './admin-page/admin-sidebar/admin-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    CheckoutComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    UerAdminComponent,
    ProductAdminComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    AdminSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
