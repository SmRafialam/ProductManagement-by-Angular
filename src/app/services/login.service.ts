import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiHost!:string;

  constructor(private http: HttpClient,private router:Router) {
    //this.apiHost = env

  }

  onLogin(obj:any): Observable<any>{
    const url = 'https://pim-nest.vercel.app/api/v1/auth/login';
    return this.http.post(url,obj);
   }

   get isLoggedIn():boolean{
    const authToken = localStorage.getItem('access_token');
    return authToken !== null? true:false;
   }

   onLogout(){
    let removeToken = localStorage.removeItem('access_token');
    if(removeToken == null){
      this.router.navigate(['/']);
    }
   }

   getUserInfo(): Observable<any>{
    const url = 'https://pim-nest.vercel.app/api/v1/user/info';
    return this.http.get(url);
   }

   getCategories(){
    const url = 'https://pim-nest.vercel.app/api/v1/collections/snippet/category';
    return this.http.get(url);
   }
}
