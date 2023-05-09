import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutpageComponent } from './components/layoutpage/layoutpage.component';
import { WrapcontentComponent } from './components/wrapcontent/wrapcontent.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BookingComponent } from './components/components/booking/booking.component';
import { CustomerComponent } from './components/components/customer/customer.component';
import { RoomComponent } from './components/components/room/room.component';
import { AddbookingComponent } from './components/addbooking/addbooking.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { StorageService } from './_service/storage.service';
import { AuthGuard } from './_helper/http.guard';
import { AuthTokenInterceptor } from './_helper/http.interceptor';
import { PageErrorComponent } from './page-error/page-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/components/payment/payment.component';
import { EmployeeComponent } from './components/components/employee/employee.component';
import { BellNotifComponent } from './components/bell-notif/bell-notif.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './_helper/loading.interceptor';
@NgModule({
  declarations: [
    BellNotifComponent,
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutpageComponent,
    WrapcontentComponent,
    BookingComponent,
    CustomerComponent,
    RoomComponent,
    AddbookingComponent,
    LoginAdminComponent,
    PageErrorComponent,
    PaymentComponent,
    EmployeeComponent,
    SpinnerComponent

  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider:{
        provide:JWT_OPTIONS,
        useFactory: jwtOptionsFactor,
        deps:[StorageService]
      }
    }),
    ReactiveFormsModule,
    HttpClientModule,

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

