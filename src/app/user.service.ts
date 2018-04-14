import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TodoVO} from './domain/todo.vo';
import {environment} from '../environments/environment';

@Injectable()
export class UserService {

  private SERVER: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json' // json 통신
    });
  }
  // todoVO 배열타입으로 리턴 받는다는거임
  getTodoList(): Observable<TodoVO[]> {
    // api ?-> optional
    return this.http.get<TodoVO[]>(this.SERVER + '/api/todo');
  }

  /*getTodoList() {
    // api ?-> optional
    return this.http.get('http://www.javabrain.kr:8080/api/todo');
  }*/
}
