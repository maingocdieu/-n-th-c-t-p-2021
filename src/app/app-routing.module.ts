import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [


  {
    path: 'admin',
    loadChildren: () => import('./admin-page/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./user-page/user.module').then(m => m.UserModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
