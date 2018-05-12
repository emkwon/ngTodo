import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {TodoVO} from './domain/todo.vo';
import {environment} from '../environments/environment';
import {ResultVO} from './domain/result.vo';
import {MemberVO} from './domain/member.vo';

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
  removeTodo(todo_id: number): Observable<ResultVO> {
    return this.http.delete<ResultVO>(this.SERVER + `/api/todo?todo_id=${todo_id}`);
  }


  // social login  -----------------------------------------------------------------------------------------------------
  getSocial(site: string) {
    return this.http.get(this.SERVER + '/api/social?site=' + site);
  }

  getMember(member_id: number): Observable<HttpResponse<MemberVO>> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    return this.http.get<MemberVO>(this.SERVER + '/member/api/member?member_id=' + member_id, {headers: header, observe: 'response'});
  }

  modifyMember(member: MemberVO): Observable<HttpResponse<ResultVO>> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    return this.http.put<ResultVO>(this.SERVER + '/member/api/member', member, {headers: header, observe: 'response'});
  }
}
