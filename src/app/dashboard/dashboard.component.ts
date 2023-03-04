import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
declare var $:any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  userLists: any[] = [];

  constructor(private accountService:LoginService){

  }

  ngOnInit(): void {
  //  this.loadUsers();
    this.loadCategories();
    this.loadScripts();
  }

  loadUsers(){
    this.accountService.getUserInfo().subscribe((data:any)=>{
      console.log(data.result);
      //this.userLists = data.result;
    })
  }

  loadCategories(){
    this.accountService.getCategories().subscribe((data:any)=>{
      console.log(data.result);
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


