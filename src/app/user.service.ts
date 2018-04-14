import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TodoVO} from './domain/todo.vo';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  // todoVO 배열타입으로 리턴 받는다는거임
  getTodoList(): Observable<TodoVO[]> {
    // api ?-> optional
    return this.http.get<TodoVO[]>('http://www.javabrain.kr:8080/api/todo');
  }

  /*getTodoList() {
    // api ?-> optional
    return this.http.get('http://www.javabrain.kr:8080/api/todo');
  }*/
}
