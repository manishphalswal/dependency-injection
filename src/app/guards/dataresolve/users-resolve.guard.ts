import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolveGuard implements Resolve<IUser[]> {

  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): IUser[] | Observable<IUser[]> | Promise<IUser[]> {

      return this.userService.getUsersViaRest();
  }
}
