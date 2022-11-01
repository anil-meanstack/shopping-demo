import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisteredComponent } from './registered/registered.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { AddcartComponent } from './addcart/addcart.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: "", component: RegisteredComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent,canActivate:[AuthGuard] },
  { path: "product", component: ProductComponent },
  { path: "addproduct", component: AddproductComponent },
  { path: "editproduct/:id", component: EditproductComponent },
  { path: "addcart", component: AddcartComponent },
  { path: "userprofile/:id", component: UserprofileComponent }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
