import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private accountService: ApiService,private router:Router){

  }

  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('AuthGuard called');

      const currentUser = this.accountService.currentUser$;
      if(!this.accountService.isLoggedIn && !currentUser){
        //this.accountService.isLoggedIn
        window.alert("Access not allowed!");
        this.router.navigate(['/login']);
      }
    return true;
  }

}
