import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Route, RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { UserPageComponent } from './user-page.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CardStatusComponent } from './card-status/card-status.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { UpdatePNComponent } from '../admin-page/phieunhap/update-pn/update-pn.component';
import { UpdateAcountComponent } from './update-acount/update-acount.component';



const UserRoutes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        
      },
      {
        path : 'cart',
        component: CartComponent
      },

      {
        path: 'category/:id',
        component: ProductListComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      },
      {
        path:'product',
        component: ProductListComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'search/:keyword', component: ProductSearchComponent
      }
      ,{
        path: "update_acount",
        component: UpdateAcountComponent
      }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(UserRoutes)
  ],
  exports: [RouterModule]
})
export class UserPageRoutingModule { }







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