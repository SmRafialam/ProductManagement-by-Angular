import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  users: any[] = [];

  loginObj:any = {
    'email':'',
    'password':''
  };
  constructor(private accountService:LoginService,private router: Router){

  }

  ngOnInit(): void {
    this.getLocalData();
  }

  getLocalData(){
    const localData = localStorage.getItem('access_token');
    //console.log(localData);
    if(localData!= null){
      this.users = JSON.parse(localData)
    }
    return localData;
  }

  doLogin(){
    alert("Ok!!")
    this.accountService.onLogin(this.loginObj).subscribe((res)=>{
      console.log('res',res);
      localStorage.setItem('access_token',res.access_token);
      this.router.navigateByUrl('/dashboard');
    })
  }
}
