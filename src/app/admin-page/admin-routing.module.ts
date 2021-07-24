import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { CanActivateRouteGuard } from '../can-activate-route.guard';
import { AddProductComponent } from './add-product/add-product.component';


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
        path:'addProduct',
        component: AddProductComponent
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