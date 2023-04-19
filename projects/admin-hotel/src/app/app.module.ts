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
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { StorageService } from './_service/storage.service';
@NgModule({
  declarations: [
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
    SignupAdminComponent,

  ],
  imports: [
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
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
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

