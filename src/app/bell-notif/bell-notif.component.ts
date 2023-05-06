import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, IHttpConnectionOptions } from '@microsoft/signalr';
import { StorageService } from '../_service/storage.service';

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
  constructor(private storage: StorageService) {}
  ngOnInit() {
    if (this.storage.isLoggedIn()) {
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

