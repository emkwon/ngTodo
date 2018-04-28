import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {ResultVo} from '../domain/result.vo';
import {NewsVO} from '../domain/news.vo';

@Injectable()
export class AdminService {

  private SERVER: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.SERVER = `${environment.HOST}`;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json' // json 통신
    });
  }

  findNews(parmas: any): Observable<NewsVO> {
    return this.http.post<NewsVO> (this.SERVER + '/api/newsList', parmas, {headers: this.headers});
  }
}
