import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Room, addRoom, roomType } from '../models/room.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';
import { Blog } from '../models/blog.model';
import { User } from './user.model';
import { Data } from '@angular/router';
import { Search } from 'src/app/models/search.model';
import { Staff } from '../models/staff.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient ,private auth: AuthService) {}
  user: any;
  room!: addRoom;
  blog: any;
  private roomData: { [roomNumber: string]: any } = {};
  apiRoom = 'https://webhotel.click/user/room/get-all';
  apiBlog = 'http://localhost:3000/blog';
  private baseUrl1 = 'http://localhost:3000/rooms';

  ////////////////////////////////////// Room API
  getRooms() {
    return this.http.get<Room[]>(environment.BASE_URL_API + '/v2/admin/room/get-all');

  }

  postRoom(room: addRoom) {
    return this.http.post<any>('https://webhotel.click/v2/admin/room/create', room );
  }
  deleteRoom(id: string): Observable<any> {
    return this.http.get(`https://webhotel.click/v2/admin/room/delete/?id=${id}`);
    // return this.http.delete(`http://localhost:3000/rooms/${id}`);
  }

  updateRoom(id: string): Observable<any> {
    return this.http.get(`https://webhotel.click/v2/admin/room/update/?id=${id}`);
  }

  getRoomDetail(id: string): Observable<Room>{
    const url = `${environment.BASE_URL_API}/user/room/get-by-id?id=${id}`;
    // const url = `http://localhost:3000/rooms/${id}`;
    return this.http.get<Room>(url);
  }
  searchRoom(query: string): Observable<any>{
    return this.http.get<Room[]>(`${environment.BASE_URL_API}/api/Room/getAllBy${query}`)
  }

  getRoomTypeId(): Observable<Search[]>{
    return this.http.get<Search[]>(environment.BASE_URL_API + '/user/search-room')
  }


  updateRoomData(roomNumber: string, data: any): void {
    if (!this.roomData[roomNumber]) {
      this.roomData[roomNumber] = {};
    }
    this.roomData[roomNumber] = { ...this.roomData[roomNumber], ...data };
  }


  getAllRoomType(): Observable<roomType[]>{
    return this.http.get<roomType[]>(environment.BASE_URL_API + '/v2/admin/room-type/get-all');
  }
  createRoomType(typeName: string){
    return this.http.post(environment.BASE_URL_API + '/v2/admin/room-type/create', typeName);
  }
  updateRoomType(data: string, id: number): Observable<any> {
    return this.http.post( environment.BASE_URL_API + `/v2/admin/room-type/update?id=${id}`, data);
  }
  deleteRoomType(id: number){
    return this.http.delete(environment.BASE_URL_API + `/v2/admin/room-type/delete?id=${id}`)
  }
  bookRoom(startDate: Data, enDate: Data, roomId: string, numberOfDays: number): Observable<any>{

    const data = {
         start_date: startDate,
         end_date: enDate,
         room_id: roomId,
         number_of_days: numberOfDays
       };
       return this.http.post(environment.BASE_URL_API + '', data);

     }

  /////////////////////////////////////////// Blog API


  getBlogs(){
    return this.http.get<Blog[]>(this.apiBlog);
  }
  getBlogDetail(id: number): Observable<Blog>{
    return this.http.get<Blog>(`${this.apiBlog}/${id}`).pipe();
  }



////////////////////////////////////////////////// User API

  getUser() {
    this.user = this.auth.userProfile
    return this.user
  }

  getallUser(){
    return this.http.get<Staff[]>(environment.BASE_URL_API + '/v2/admin/account/get-all');
  }


}
