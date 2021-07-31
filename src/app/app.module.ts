import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { AdminModule } from './admin-page/admin.module';
import { UserModule } from './user-page/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SelectRequiredValidatorDirective } from './validators/select.required.directive';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SelectRequiredValidatorDirective,
    
  ],
  imports: [
    MatSliderModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    UserModule,
    AdminModule,
    AppRoutingModule,
   
    BrowserAnimationsModule
  ],
  providers: [CanActivateRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
