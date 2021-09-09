import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CanActivateRouteGuard } from '../can-activate-route.guard';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AddGoodsNoteComponent } from './add-goods-note/add-goods-note.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { OderlistComponent } from './order/oderlist/oderlist.component';
import { ListphieunhapComponent } from './phieunhap/listphieunhap/listphieunhap.component';

import { ColorlistComponent } from './color/colorlist/colorlist.component';
import { ListSizeComponent } from './size/list-size/list-size.component';
import { ListSupplierComponent } from './supplier/list-supplier/list-supplier.component';
import { ProductDetailComponent } from '../user-page/product-detail/product-detail.component';
import { InsertProductDetailComponent } from './product/insert-product-detail/insert-product-detail.component';
import { UerAdminComponent } from './user/uer-admin/uer-admin.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ThongkeComponent } from './thongke/thongke.component';
import { ThonglelailoComponent } from './thonglelailo/thonglelailo.component';


const AdminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      {
        path: '',
        component: ProductAdminComponent,
        canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'addProduct',
        component: AddProductComponent
      },
      {
        path: 'phieuNhap',
        component: AddGoodsNoteComponent
      },
      {
        path: 'addCategory',
        component: AddCategoryComponent
      },
      {
        path: 'listSanPham',
        component: ProductAdminComponent,
      },
      {
        path: 'product/edit/:id',
        component: AddProductComponent
      },
      {
        path: 'order',
        component: OderlistComponent
      },
      {
        path: 'getphieunhap',
        component: ListphieunhapComponent
      },
      {
        path: 'user',
        component: UerAdminComponent
      },

      {

        path: 'color',
        component: ColorlistComponent
      },
      {

        path: 'size',
        component: ListSizeComponent
      },
      {

        path: 'supplier',
        component: ListSupplierComponent
      },
      {
        path: 'productdetail',
        component: InsertProductDetailComponent
      },
      {
        path: 'user/dangkitaikhoan',
        component: CreateUserComponent
      },
      {
        path: 'thongke',
        component: ThongkeComponent
      },
      {
        path:'thongkelailo',
        component: ThonglelailoComponent
      }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }




// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ProductListComponent } from './product-list/product-list.component';
// import { ProductDetailComponent } from './product-detail/product-detail.component';
// import { RouterModule, Routes } from '@angular/router';

// const productRoutes: Routes = [
//   {
//     path: 'product',
//     component: ProductListComponent
//   },
//   {
//     path: 'product/:id',
//     component: ProductDetailComponent
//   }
// ];

// @NgModule({
//   imports: [
//     RouterModule.forChild(productRoutes)
//   ],
//   exports: [RouterModule]
// })
// export class ProductRoutingModule { }