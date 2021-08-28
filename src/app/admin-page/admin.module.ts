import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGoodsNoteComponent } from './add-goods-note/add-goods-note.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { MatSliderModule } from '@angular/material/slider';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoryDialogComponent } from './category/category-dialog/category-dialog.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../common/alert/alert.component';
import { MyDialogComponent } from '../common/my-dialog/my-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OderlistComponent } from './order/oderlist/oderlist.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { ListphieunhapComponent } from './phieunhap/listphieunhap/listphieunhap.component';
import { ChitietphieunhapComponent } from './phieunhap/chitietphieunhap/chitietphieunhap.component';
import { UpdatePNComponent } from './phieunhap/update-pn/update-pn.component';
import { UerAdminComponent } from './uer-admin/uer-admin.component';
import { ColorlistComponent } from './color/colorlist/colorlist.component';
import { ColordialogComponent } from './color/colordialog/colordialog.component';
import { SizedialogComponent } from './size/sizedialog/sizedialog.component';
import { ListSizeComponent } from './size/list-size/list-size.component';
import { ListSupplierComponent } from './supplier/list-supplier/list-supplier.component';
import { SupplierDialogComponent } from './supplier/supplier-dialog/supplier-dialog.component';
import { InsertProductDetailComponent } from './product/insert-product-detail/insert-product-detail.component';
import { ProductdetailComponent } from './product/productdetail/productdetail.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';

@NgModule({
  declarations: [
    AdminSidebarComponent,
    HeaderAdminComponent,
    UerAdminComponent,
    ProductAdminComponent,
    AdminPageComponent,
    AddProductComponent,
    AddGoodsNoteComponent,
    AddCategoryComponent,
    CategoryDialogComponent,
    AlertComponent,
    MyDialogComponent,
    OderlistComponent,
    OrderDetailComponent,
    ListphieunhapComponent,
    ProductdetailComponent,
    ChitietphieunhapComponent,
    UpdatePNComponent,
    ColorlistComponent,
    ColordialogComponent,
    SizedialogComponent,
    ListSizeComponent,
    ListSupplierComponent,
    SupplierDialogComponent,
    InsertProductDetailComponent,
    UpdateProductComponent,
  
  ],
  imports: [
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ]
})
export class AdminModule { }
