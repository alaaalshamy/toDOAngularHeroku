import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/service/data.service';
import {  User } from 'src/interfaces/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userInfo:any;
  errMessage :any;
  constructor(private router:Router,private dataService:DataService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,Validators.required),
    });
   }

  ngOnInit() {
  }
  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && (this.loginForm.get(controlName).touched ||this.loginForm.get(controlName).dirty);
  }
loginUser(form,e){
  if(this.loginForm.valid){
    this.dataService.loginUser(this.loginForm.value)
    .subscribe((userinfo: User[]) => {
      this.userInfo = userinfo;
      if(this.userInfo.status ==  true){
        localStorage.setItem('token',this.userInfo.token );
        localStorage.setItem('userId',this.userInfo.user._id );
        this.router.navigate(['/Home']);
      }
      else{
        this.errMessage = (this.userInfo.err == "password not valid" ) ? "email or password not valid" :(this.userInfo.err== "Email Not Found")? "This email not registered": "Not valid user"
      }  
    },err => {
      console.log('API  not Sent');
    });
    
  }else{

  }
}
}
