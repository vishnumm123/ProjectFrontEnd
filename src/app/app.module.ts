import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { ServiceService } from './service.service';
import { HttpClientModule } from '@angular/common/http'
import { AuthGuard } from './auth/auth.guard';
import { SellerAuthGuard } from './auth/seller-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BuyerHomeComponent,
    SellerHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'buyer-home',
        component:BuyerHomeComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'seller-home',
        component:SellerHomeComponent,
        canActivate:[SellerAuthGuard]
      }
    ])
  ],
  providers: [ServiceService,AuthGuard,SellerAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
