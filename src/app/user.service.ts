import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TodoVO} from './domain/todo.vo';
import {environment} from '../environments/environment';
import {ResultVo} from './domain/result.vo';

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

  // 할일 추가 api
  addTodo(params: TodoVO): Observable<TodoVO> {
    return this.http.post<TodoVO> ('http://www.javabrain.kr:8080/api/todo', params, {headers: this.headers});
  }

  // 할일 수정 api
  modifyTodo(params: TodoVO): Observable<TodoVO>  {  // 리턴타입 지정
    return this.http.put<TodoVO>(this.SERVER + '/api/todo', params, {headers: this.headers});

  }


  // 할일 삭제 api
  removeTodo(todo_id: number): Observable<ResultVo> {
    return this.http.delete<ResultVo>(this.SERVER + `/api/todo?todo_id=${todo_id}`);
  }

}
