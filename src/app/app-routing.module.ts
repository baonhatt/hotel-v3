import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_helper/http.guard';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfileComponent } from './client/profile/profile.component';
import { LoaderService } from './_service/loader.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ContactComponent } from './contact/contact.component';
import { ListingComponent } from './listing/listing.component';
import { EditProfileComponent } from './client/edit-profile/edit-profile.component';
import { PasswordChangeComponent } from './client/password-change/password-change.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomepageComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'room-detail/:id',
    component: RoomDetailComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile',
    component: ProfileComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'blogs',
    component: BlogsComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'blog-detail/:id',
    component: BlogDetailComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'password-change',
    component: PasswordChangeComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgetpasswordComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'reset-password',
    component: ResetpasswordComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'room-listing',
    component: ListingComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },

  {
    path: 'edit-booking',
    component: EditProfileComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'room',
    component: RoomDetailComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    component: PagenotfoundComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  // { path: '', component: HomepageComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
