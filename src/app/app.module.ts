import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthTokenInterceptor } from './_helper/http.interceptor';
import { HeaderComponent } from './header/header.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './_helper/http.guard';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { FooterComponent } from './footer/footer.component';
import { StorageService } from './_service/storage.service';
import { EmailValidatorDirective } from './_shared/validator/email-validators.directive';
import {  ValidatorFn, AbstractControl } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfileComponent } from './client/profile/profile.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ContactComponent } from './contact/contact.component';
import { ListingComponent } from './listing/listing.component';
import { RoomDetailGuard } from './_helper/room-detail.guard';
import { EditProfileComponent } from './client/edit-profile/edit-profile.component';
import { PasswordChangeComponent } from './client/password-change/password-change.component';
import { AlertModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { AboutComponent } from './about/about.component';
import { LeftContentComponent } from './client/dashboard/left-content/left-content.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    HeaderComponent,
    RoomDetailComponent,
    FooterComponent,
    PagenotfoundComponent,
    ProfileComponent,
    SpinnerComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    ContactComponent,
    ListingComponent,
    EditProfileComponent,
    PasswordChangeComponent,
    BlogsComponent,
    BlogDetailComponent,
    CheckoutComponent,
    AboutComponent,
    LeftContentComponent,

  ],
  imports: [
    BrowserModule,
    NgToastModule,
    AppRoutingModule,
    RouterModule.forChild([{ path: 'products', component: ListingComponent },
    {
      path: 'products/:id',
      canActivate: [RoomDetailComponent],
      component: RoomDetailComponent
    }])
    ,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider:{
        provide:JWT_OPTIONS,
        useFactory: jwtOptionsFactor,
        deps:[StorageService]
      }
    }),
    AlertModule,
    IconModule

  ],
  providers:
  [
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    [AuthGuard],
    [
      {
        provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
      }
    ]
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

export function jwtOptionsFactor(storage:StorageService){
  return {
    tokenGetter:() => {
      console.log("Đã add authen");

      return storage.getAccessToken();
    },
    allowedDomains:["https://webhotel.click"],
    disallowedRoutes:[
      "https://webhotel.click/user/login",
      "https://webhotel.click/user/token/refresh"
    ],
    skipWhenExpired: false,
  }
}
