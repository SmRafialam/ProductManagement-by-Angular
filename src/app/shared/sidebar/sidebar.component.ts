import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/auth.service';
declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  userLists: any[] = [];
  isLoggedIn = false;


  constructor(private accountService:ApiService, private router:Router){

  }

  ngOnInit(): void {
    this.loadUsers();
    //this.loadScripts();
   // this.checkLoggedIn();

    this.loginStatus$ = this.accountService.ifLoggedIn;
    this.userData$ = this.accountService.currentUser$;
  }

  loginStatus$:Observable<boolean> | undefined;
  userData$:Observable<string> | undefined;


  doLogout(){
    this.accountService.onLogout();
    this.userLists == null;
    // this.isLoggedIn = false;
    this.router.navigate(['/login']); // redirect to login page\
    console.log("Successfully Logged Out!!");

  }

  loadUsers(){
    this.accountService.UserData$.subscribe((data:any)=>{
    console.log(data);
    const localUSer = localStorage.getItem('user');
    //console.log(localData);
    if(localUSer!= null){
      this.userLists = JSON.parse(localUSer)
    }
    return localUSer;

    })

  }

  // checkLoggedIn(){
  //    // Check if user is logged in
  //    if (this.userLists!=null) {
  //     this.isLoggedIn = true;
  //   } else {
  //     // Redirect to login page
  //     this.router.navigate(['/login']);
  //   }
  // }



  private loadScripts() {
    console.log("custom js")
    $(".expand-btn").click(function () {
      console.log("expand")
      $(".pruvit-cms").toggleClass("expandSideMenu");
    });
  }

}
