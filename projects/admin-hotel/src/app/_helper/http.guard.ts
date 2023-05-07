
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { StorageService } from '../_service/storage.service';
import { User } from '../_service/user.model';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private storage: StorageService) {}
  private hasReloaded = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot


  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      const id = Number(route.paramMap.get('id'));

    var check = this.auth.checkAccessTokenAndRefresh();
    console.log(check.status);

    var token = this.storage.isLoggedIn();
    // if (!this.hasReloaded) {
    //   this.hasReloaded = true;
    //   location.reload(); // Tải lại trang
    // }

    if (token) {
      if (state.url == "/login"){
        this.router.navigate(['/']);
        return true;
      }


      return true;
    } else {
      if (route.data['requiredAuth'] == true) {
        this.router.navigate(['/**']);
        return false;
      }
      return true;
    }


  }
}
