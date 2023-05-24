import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { Roles } from '../models/roles.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpClient ,private auth: AuthService) {}


    getAllRoles(): Observable<any[]>{
        return this.http.get<any[]>(environment.BASE_URL_API + '/v2/admin/role/get-all')
    }
}
