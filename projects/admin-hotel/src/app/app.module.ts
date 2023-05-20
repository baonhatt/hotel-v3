import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BookingComponent } from './pages/booking/booking.component';
import { AddbookingComponent } from './components/booking/addbooking/addbooking.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { StorageService } from './_service/storage.service';
import { AuthTokenInterceptor } from './_helper/http.interceptor';
import { PageErrorComponent } from './pages/page-error/page-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BellNotifComponent } from './components/bell-notif/bell-notif.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './_helper/loading.interceptor';
import { AuthGuard } from './_helper/http.guard';
import { RoomComponent } from './pages/room/room.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { RoomtypeComponent } from './pages/roomtype/roomtype.component';
import { RoomservicesComponent } from './pages/roomservices/roomservices.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { VndCurrencyPipe } from 'src/app/_shared/currency/vnd-currency.pipe';
import { BlogComponent } from './pages/blog/blog.component';
import { RoomTypeServiceComponent } from './pages/room-type-service/room-type-service.component';
import { FilterPipe } from './_shared/filter.pipe';
import { BookingFilterPipe } from './_shared/booking/booking-filter.pipe';
import { ChartModule } from 'angular-highcharts';
import { ChartComponent } from './components/chart/chart.component';
import { RoomBookedComponent } from './pages/room-booked/room-booked.component';
import { RevenueComponent } from './pages/revenue/revenue.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    ChartComponent,
    FilterPipe,
    BellNotifComponent,
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutpageComponent,
    BookingComponent,
    CustomerComponent,
    RoomComponent,
    AddbookingComponent,
    LoginAdminComponent,
    PageErrorComponent,
    EmployeeComponent,
    SpinnerComponent,
    RoomtypeComponent,
    RoomservicesComponent,
    DiscountComponent,
    VndCurrencyPipe,
    BlogComponent,
    RoomTypeServiceComponent,
    FilterPipe,
    BookingFilterPipe,
    RoomBookedComponent,
    RevenueComponent,
    InvoiceComponent,
  ],
  imports: [
    ChartModule,
    FormsModule,
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
    ],
    [DatePipe]
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

