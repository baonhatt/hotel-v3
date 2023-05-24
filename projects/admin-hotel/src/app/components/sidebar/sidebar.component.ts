import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../_service/permission.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../_service/user.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  showCustomers = false;
    roleAccount!: any

    
    constructor(private permissionService: PermissionService, private jwt: JwtHelperService){

        this.permissionService.checkRole('Admin');
        this.permissionService.checkRole('Employee');
    }
    ngOnInit(): void {
        this.getRole()
    }


    
    getRole(){
        const tokenTemp = localStorage.getItem('token_admin')
       if(tokenTemp !== null){
           const tokenInfo =  JSON.parse(tokenTemp)
           const accessToken = tokenInfo.accessToken

           var claims = JSON.stringify(this.jwt.decodeToken(accessToken));
          
            claims = claims.replaceAll(
               'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/',
               ''
             );
            claims = claims.replaceAll(
               'http://schemas.microsoft.com/ws/2008/06/identity/claims/',
               ''
               
             );
             this.roleAccount = JSON.parse(claims) as User;

            console.log(this.roleAccount);


            

       }

    }
    hasSalaryManagementPermission(): boolean {
        return this.permissionService.hasPermission('Admin');
      }
    toggleCustomers() {
        this.showCustomers = !this.showCustomers;
    }
}
