import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/auth.service';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PIM';

  constructor(private accountService: ApiService){

  }

  ngOnInit(): void {

      this.loadScripts();
      this.getUsersData();
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
    })
  }
}
