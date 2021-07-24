import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminSidebarComponent,
    HeaderAdminComponent,
    ProductAdminComponent,
    AdminPageComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
