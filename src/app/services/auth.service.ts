import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiHost!:string;
  private userData = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient,private router:Router) {
    console.log(environment.apiHost);

    this.apiHost = environment.apiHost;
  }

  onLogin(obj:any): Observable<any>{
    // const url = 'https://pim-nest.vercel.app/api/v1/auth/login';
    const endpoint = 'auth/login';
    const url = `${this.apiHost}${endpoint}`
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
    // const url = 'https://pim-nest.vercel.app/api/v1/user/info';
    const endpoint = 'user/info';
    const url = `${this.apiHost}${endpoint}`;
    return this.http.get(url);
   }

   setUserData(users:any){
    this.userData.next(users)
   }

   get UserData$(){
    return this.userData;
   }





   refreshToken() {
    const endpoint = 'auth/login';
    const url = `${this.apiHost}${endpoint}`
    return this.http.post(url + 'refreshtoken', { });
  }

  getRefreshToken(): Observable<any>{
    const url = 'https://pim-nest.vercel.app/api/v1/auth/access-token';
    return this.http.get(url);

  }

}
