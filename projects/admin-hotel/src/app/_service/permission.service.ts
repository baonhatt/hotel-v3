import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
    private userRoles: string[] = [];
    
    constructor() { 
        this.userRoles = ['Admin'];
    }

    hasPermission(permission: string): boolean {
        // Kiểm tra xem vai trò của người dùng có quyền hạn 'permission' hay không
        return this.userRoles.includes(permission);
    }

    checkRole(role: string): void {
        if (this.hasPermission(role)) {
        //   console.log(`Người dùng có vai trò ${role}.`);
        } else {
        //   console.log(`Người dùng không có vai trò ${role}.`);
        }
      }
}
