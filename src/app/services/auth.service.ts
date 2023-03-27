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
  private loginStatus$ = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private userData = new BehaviorSubject<any>(localStorage.getItem('user'));
  public currentUser$ = this.userData.asObservable();



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

   checkLoginStatus():boolean{
      return false;
   }

   get ifLoggedIn(){
    return this.loginStatus$.asObservable();
   }


   onLogout(){
    let removeToken = localStorage.removeItem('access_token');
    let removeUser = localStorage.removeItem('user');
    if(!this.isLoggedIn && removeToken == null){
      this.router.navigate(['/login']);
    }
    if(!this.isLoggedIn && removeUser == null){
      this.router.navigate(['/login']);
    }
   }

   getUserInfo(): Observable<any>{
    // const url = 'https://pim-nest.vercel.app/api/v1/user/info';
    const endpoint = 'user/info';
    const url = `${this.apiHost}${endpoint}`;
    return this.http.get(url);
   }

   setUserData(users:any){
    this.userData.next(users);
    localStorage.setItem('user', JSON.stringify(users));
   }

   get UserData$(){
    localStorage.getItem('user');
    return this.userData;
   }

   doUserLogin(){
        // authenticate the user and retrieve their information
        this.UserData$.subscribe((user)=>{
          // store the user information in localStorage
          localStorage.setItem('currentUser$', JSON.stringify(user));

          // emit the user information using the currentUserSubject
          this.userData.next(user);
        })
   }

  //  checkLoginStatus(): boolean {
  //   const authToken = localStorage.getItem('access_token');

  //   if (authToken) {
  //     // Decode the token to get the expiration date
  //     const tokenExpirationDate = jwt_decode(authToken).exp;

  //     // Check if the token is still valid
  //     const currentDate = new Date().getTime() / 1000; // Convert to seconds
  //     return tokenExpirationDate >= currentDate;
  //   } else {
  //     return false;
  //   }
  // }




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
