import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutpageComponent } from '../../../admin-hotel/src/app/components/layoutpage/layoutpage.component';
import { BookingComponent } from './components/components/booking/booking.component';
import { CustomerComponent } from '../../../admin-hotel/src/app/components/components/customer/customer.component';
import { RoomComponent } from './components/components/room/room.component';
import { AddbookingComponent } from './components/addbooking/addbooking.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { WrapcontentComponent } from './components/wrapcontent/wrapcontent.component';
import { AuthGuard } from './_helper/http.guard';
AuthGuard
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginAdminComponent,
    data: {
      requiredAuth: false
    },
    // canActivate: [AuthGuard]
  },
  {path: 'dashboard', component: LayoutpageComponent},
  {path: 'booking', component: BookingComponent},
  {path: 'add-booking', component: AddbookingComponent},
  {path: 'customer', component: CustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
