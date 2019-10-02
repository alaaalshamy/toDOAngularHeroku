import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {ToDoCart,User} from  '../interfaces/interface'
@Injectable({
  providedIn: 'root'
})
export class DataService {
url="http://localhost:3000/"
  constructor(private http: HttpClient) { }

  getUserCarts(data,token) : Observable<ToDoCart[]> {
    console.log(token)
    console.log(data)
    return this.http.post<ToDoCart[]>(this.url+'toDoCart/getUserCarts/'+token,data)
        .pipe(
            catchError(this.handleError)
        );
}
  loginUser(data) : Observable<User[]>{
    return this.http.post<User[]>(this.url+'users/login',data)
      .pipe(
          catchError(this.handleError)
      );
}
  addUserCarts(data,token) : Observable<ToDoCart[]> {
    console.log(token)
    console.log(data)
    return this.http.post<ToDoCart[]>(this.url+'toDoCart/addNewCart/'+token,data)
        .pipe(
            catchError(this.handleError)
        );
}
private handleError(error: any) {
  console.error('server error:', error);
  if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
  }
  return Observable.throw(error || 'Node.js server error');
}
}
