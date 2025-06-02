import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  canActivate():boolean{
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // get token from local storage
    let token = localStorage.getItem("token")
    if(token == null){
      alert("No Authorization")
      return false
    }
    else return true;
  }
  
}
