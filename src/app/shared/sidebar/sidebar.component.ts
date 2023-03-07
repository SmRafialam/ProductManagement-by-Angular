import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
var $:any;
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
    this.loadScripts();
    //window.location.reload();
  }

  doLogout(){
    this.accountService.onLogout();
  }

  loadUsers(){
    this.accountService.getUserInfo().subscribe((data)=>{
      this.userLists = data.result;
      console.log(this.userLists);
    })
  }

  private loadScripts() {
    console.log("custom js")
    $(".expand-btn").click(function () {
      console.log("expand")
      $(".pruvit-cms").toggleClass("expandSideMenu");
    });

  }

}
