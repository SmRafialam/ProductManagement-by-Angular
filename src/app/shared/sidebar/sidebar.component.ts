import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  userLists: any[] = [];

  constructor(private accountService:LoginService){

  }

  ngOnInit(): void {
    this.loadUsers();
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

}
