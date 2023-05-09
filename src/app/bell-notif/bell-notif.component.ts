import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as signalR from '@microsoft/signalr';
import { HubConnection, IHttpConnectionOptions } from '@microsoft/signalr';
import { catchError, first, lastValueFrom, map, Observable, of } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { StorageService } from '../_service/storage.service';
import { TokenModel } from '../_service/token.model';

@Component({
  selector: 'app-bell-notif',
  templateUrl: './bell-notif.component.html',
  styleUrls: ['./bell-notif.component.less'],
})
export class BellNotifComponent implements OnInit {
  // private hubOptions: IHttpConnectionOptions = {
  //   headers: { Authorization: 'Bearer ' + this.storage.getAccessToken() },
  // };
  count_nof: any;
  items_nof: any;
  constructor(private storage: StorageService, private jwtHelper: JwtHelperService,private authService: AuthService) {}
  async ngOnInit() {
    await this.checkAndRefreshToken();
    console.log(3);

    if (this.storage.isLoggedIn()) {
      console.log("ddax vafo");

      var hubConnection: HubConnection;
      hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://webhotel.click/hub', {accessTokenFactory: () => this.storage.getAccessToken() })
        .build();
      hubConnection
        .start()
        .then(function () {
          console.log('SignalR Connected!');
          sendMessage(hubConnection);
          sendNotificationGetRoom(hubConnection);
        })
        .catch(function (err) {
          return console.error('đã lỗi' + err.toString());
        });
      hubConnection.on('ReceiveMessage', (sender, message) => {
        console.log(sender + ': ' + message);
      });
      hubConnection.on('ReceiveNotification', (res) => {
        this.count_nof = res.count;
        this.items_nof = res.items;
        console.log(res.count);
      });
    }
  }
  async checkAndRefreshToken() : Promise<void>
  {
    const localStorageTokens = localStorage.getItem('token');
    if (localStorageTokens) {
      var token = JSON.parse(localStorageTokens) as TokenModel;
      var isTokenExpired = this.jwtHelper.isTokenExpired(token.accessToken);
      if (isTokenExpired) {
        await this.refreshToken(token);
        console.log(2);

      }
    }
  }
  async refreshToken(token:any): Promise<void> {
    var check = true;
    const res$ = await this.authService.refreshToken(token).toPromise()
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res));
    })
    .catch((error)=>{
      localStorage.removeItem('token');
            localStorage.removeItem('user_profile');
            console.log("1");

            // toastr.error("Login session has expired, please login again");
            // router.navigate(["login"]);
    })
    // .pipe(
    //   map((res) => res))
    // .pipe(first())

    // const res = await lastValueFrom(res$);
    // localStorage.setItem("token", JSON.stringify(res));
  }
}

function sendMessage(hubConnection:HubConnection) {
  hubConnection!.invoke('SendChatMessageAuto', 'Ok hiểu').catch(
    function (err) {
      return console.error(err.toString());
    }
  );
}
function sendNotificationGetRoom(hubConnection:HubConnection) {
  hubConnection!.invoke('GetAllRoom', true).catch(function (err) {
    return console.error(err.toString());
  });
}
