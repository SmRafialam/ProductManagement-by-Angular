import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './services/auth.service';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PIM';
  isLoggedIn:boolean = true;
  private _userData: any = null;

  constructor(private accountService: ApiService,private router: Router){

    //this.router.navigate(['/login']);

  }

  ngOnInit(): void {
    // this.loadScripts();
    this.getUsersData();
    //this.checkLoggedIn();

    // this.loginStatus$ = this.accountService.ifLoggedIn;
    // this.userData$ = this.accountService.currentUser$;

    this.accountService.currentUser$.subscribe((userData) => {
      //console.log(userData);
      if (userData === null) {
        // User is not logged in
        this.isLoggedIn = false;
        this.checkLoggedIn();

      } else {
        // User is logged in
        this.isLoggedIn = true;
      }
    });


  }



  private loadScripts() {
    console.log("custom js")
    $(".expand-btn").click(function () {
      console.log("expand")
      $(".pruvit-cms").toggleClass("expandSideMenu");
    });
  }

  getUsersData(){
    this.accountService.getUserInfo().subscribe((data:any)=>{
      return this.accountService.setUserData(data.result);
    });
  }

  // getUserInfo(){
  //   const localUser = localStorage.getItem('user');
  //   if(localUser){
  //     this.accountService.setUserData(JSON.parse(localUser))
  //   }
  // }


  // checkLoggedIn(){
  //    // Check if user is logged in
  //    if (this.accountService.UserData$) {
  //     this.isLoggedIn = true;
  //   } else {
  //     // Redirect to login page
  //     this.router.navigate(['/login']);
  //   }
  // }

  checkLoggedIn(){
    this.accountService.currentUser$.subscribe((res)=>{
      if(res == null){
        this.isLoggedIn = false;
      }
    })
  }


}
