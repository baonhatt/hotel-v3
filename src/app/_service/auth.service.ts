import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { TokenModel } from './token.model';
import { User } from './user.model';
import { StorageService } from './storage.service';
import { NgToastService } from 'ng-angular-popup'
import { environment } from '../../environments/environment.development';
// import { TranslateService } from "@ngx-translate/core";
export const JWT_NAME = 'blog-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit{

  isHomePageLoaded = false;
  email: any;
  jwtService: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient, private storage: StorageService, private jwtHelper: JwtHelperService, private toast: NgToastService) { }
  ngOnInit(): void {
    this.loadPage()
  }
  userProfile = new BehaviorSubject<User | null>(null);
  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post<any>(environment.BASE_URL_API + '/user/login', body).pipe(
      tap((response) => {


        let token = response as TokenModel;
        this.storage.setToken(token);
        var claims = JSON.stringify(this.jwtService.decodeToken(token.accessToken));
        var userInfo = JSON.parse(claims.replaceAll("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/","")) as User;
        this.userProfile.next(userInfo);
        return true;
      }),
      catchError((error) => {
        error.
          this.toast.error({ detail: "Error Message", summary: " Please check your email or password again!", duration: 5000 })
        return of(false);
      }),
    );
  }
  loadPage(){
    if(!sessionStorage.getItem('isPageReloaded')){
      sessionStorage.setItem('isPageReloaded','true');
      window.location.reload()
    } else {
      sessionStorage.removeItem('isPageReloaded');
    }

  }
  refreshToken(login: TokenModel) {
    return this.http.post<TokenModel>(
      environment.BASE_URL_API + '/api/Token/Refresh',
      login
    );
  }


  getUserId(): Observable<number>{
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: any) => of(this.jwtHelper.decodeToken(jwt)).pipe(
        map((jwt: any) => jwt.user.id)
      )
    ));
  }
  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage khi đăng xuất
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Kiểm tra xem có thông tin người dùng nào được lưu trữ trong localStorage hoặc sessionStorage hay không
    if (this.getLoggedInUser() == null) return false;
    return true;
  }

  getLoggedInUser(): any {
    // Lấy thông tin người dùng đã đăng nhập từ localStorage hoặc sessionStorage
    var token = localStorage.getItem('token');
    if (token) {
      var tokenModel = JSON.parse(token) as TokenModel;
      var claims = JSON.stringify(this.jwtService.decodeToken(tokenModel.accessToken));
      var userInfo = JSON.parse(claims.replaceAll("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/","")) as User;
      return userInfo.name;
    }
    return null;
  }

  public checkAccessTokenAndRefresh(): { status: "", token: "" } {
    const localStorageTokens = localStorage.getItem('token');
    var check = true;
    if (localStorageTokens) {
      var token = JSON.parse(localStorageTokens) as TokenModel;
      var isTokenExpired = this.jwtHelper.isTokenExpired(token.accessToken);
      if (isTokenExpired) {
        this.refreshToken(token).subscribe(
          (tokenNew: TokenModel) => {
            localStorage.setItem('token', JSON.stringify(tokenNew));
            return Object({
              status: check,
              token: tokenNew,
            });
          },
          err => {
            this.logout();
            check = false;
          }
        );
      }
    } else {
      check = false;
    }
    return Object({
      status: check,
    });
  }




  requestChangePassword(email:string, clientURI:string) : Observable<any>{
    return this.http.post(`${environment.BASE_URL_API}/user/request-change-password`,{email, clientURI})
  }



  confirmChangePasswordViaEmail(token: string, newPassword: string, confirmNewPassword: string, email:string): Observable<any> {
    return this.http.post(`${environment.BASE_URL_API}/user/confirm-change-password`, { token, newPassword, confirmNewPassword, email });
  }


  bookRoom(startDate: Date, endDate: Date, numOfPeople: number, roomId: string, phoneNumber: string, name: string){
    const body = {
      start_date: startDate,
      end_date: endDate,
      num_of_people: numOfPeople,
      room_id: roomId
    };
    return this.http.post(environment.BASE_URL_API + '/user/reservation/create', body);
  }
  getNumberOfDays(startDate: Date, endDate: Date): number {
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }


}
