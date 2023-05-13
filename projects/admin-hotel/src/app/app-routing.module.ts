import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutpageComponent } from './pages/layoutpage/layoutpage.component';
import { BookingComponent } from './pages/booking/booking.component';
import { AddbookingComponent } from './components/booking/addbooking/addbooking.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { AuthGuard } from './_helper/http.guard';
import { PageErrorComponent } from './pages/page-error/page-error.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { RoomComponent } from './pages/room/room.component';
import { RoomtypeComponent } from './pages/roomtype/roomtype.component';
import { RoomservicesComponent } from './pages/roomservices/roomservices.component';
AuthGuard;
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginAdminComponent,
    data: {
      requiredAuth: false,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: LayoutpageComponent,
    data: {
      requiredAuth: true,
    },
    canActivate: [AuthGuard],
    children: []
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../../admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'room',
    component: RoomComponent,
    data: {
      requiredAuth: true,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'roomtype',
    component: RoomtypeComponent,
    data: {
      requiredAuth: true,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'roomservice',
    component: RoomservicesComponent,
    data: {
      requiredAuth: true,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'booking',
    component: BookingComponent,
    data: {
      requiredAuth: true,
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'customer',
    component: BookingComponent,
    data: {
      requiredAuth: true,
    },
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageErrorComponent,
    data: {
      requiredAuth: false,
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
