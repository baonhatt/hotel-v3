import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutpageComponent } from '../../../admin-hotel/src/app/components/layoutpage/layoutpage.component';
import { BookingComponent } from './components/components/booking/booking.component';
import { CustomerComponent } from '../../../admin-hotel/src/app/components/components/customer/customer.component';
import { RoomComponent } from './components/components/room/room.component';
import { AddbookingComponent } from './components/addbooking/addbooking.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { WrapcontentComponent } from './components/wrapcontent/wrapcontent.component';
import { AuthGuard } from './_helper/http.guard';
import { PageErrorComponent } from './page-error/page-error.component';
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
  {
    path: 'dashboard',
    component: LayoutpageComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]
  },
  { path: 'login', loadChildren: () => import('../../admin/admin.module').then(m => m.AdminModule) },
  { path: 'dashboard', loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
 },
  {
    path: 'room',
    component: RoomComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]
  },
  { path: 'booking', component: BookingComponent},
  { path: 'customer', component: CustomerComponent},
  {
    path: '**',
    component: PageErrorComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
