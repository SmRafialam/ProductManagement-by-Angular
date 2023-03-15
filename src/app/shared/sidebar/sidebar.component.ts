import { Component, Input, OnInit } from '@angular/core';
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


  constructor(private accountService:ApiService){

  }

  ngOnInit(): void {
    this.loadUsers();
    //this.loadScripts();


  }

  doLogout(){
    this.accountService.onLogout();
  }

  loadUsers(){
    this.accountService.UserData$.subscribe((data:any)=>{
      this.userLists = data;
      console.log(this.userLists);


    })
  }

  // private loadScripts() {
  //   console.log("custom js")
  //   $(".expand-btn").click(function () {
  //     console.log("expand")
  //     $(".pruvit-cms").toggleClass("expandSideMenu");
  //   });

  // }

}
