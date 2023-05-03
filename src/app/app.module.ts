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
import { SearchResultComponent } from './search-result/search-result.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BellNotifComponent } from './bell-notif/bell-notif.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatOption } from '@angular/material/core';
import {  NO_ERRORS_SCHEMA } from '@angular/core';
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
    SearchResultComponent,
    BellNotifComponent,

  ],
  imports: [

    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatIconModule,
    FormsModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgxPaginationModule,
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
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactor,
        deps: [StorageService]
      }
    }),
    AlertModule,
    IconModule

  ],
  providers:
    [
      {
        provide: HTTP_INTERCEPTORS,
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
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})

export class AppModule { }

export function jwtOptionsFactor(storage: StorageService) {
  return {
    tokenGetter: () => {
      console.log("Đã add authen");

      return storage.getAccessToken();
    },
    allowedDomains: ["https://webhotel.click"],
    disallowedRoutes: [
      "https://webhotel.click/user/login",
      "https://webhotel.click/user/token/refresh"
    ],
    skipWhenExpired: false,
  }
}
