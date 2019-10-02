import { Component, OnInit, Input } from '@angular/core';
import { ToDoCart } from 'src/interfaces/interface';
import { DataService } from 'src/service/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
   _toDoList: ToDoCart[] = [];
    newCart :ToDoCart[] = [];
    token="";
    postedBy="";
  constructor(private dataService: DataService,private router:Router,) {
   }
  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.postedBy = localStorage.getItem("userId");
    this.getUserCards();
    if(!this.postedBy || !this.token){
      this.router.navigate(['/login']);
    }
  }
  getUserCards(){
    this.dataService.getUserCarts({postedBy:this.postedBy},this.token)
    .subscribe((cart: ToDoCart[]) => this._toDoList = cart);
  }
  addNewCard(form,e){
    form.value.postedBy = this.postedBy;
    console.log(form.value);
    this.dataService.addUserCarts(form.value,this.token)
    .subscribe((cart: ToDoCart[]) => {
      this.newCart = cart; 
      this.getUserCards();} );
//);
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
