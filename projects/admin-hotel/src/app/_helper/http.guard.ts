
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
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      const id = Number(route.paramMap.get('id'));

    // var check = this.auth.checkAccessTokenAndRefresh();
    //add js will load
    // $.getScript('assets/js/main.js');
    $.getScript('main.js');
   

    var token = this.storage.isLoggedIn();
    console.log(token);

    if (token) {
      if (state.url.indexOf('login') > 0){
        this.router.navigate(['/dashboard']);
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
