import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {NewsVO} from '../../domain/news.vo';
import {PageVO} from '../../domain/page.vo';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsList: NewsVO[];
  page: PageVO;


  constructor(private adminService: AdminService) {
    this.page = new PageVO(0, 5, 0);
    this.page.pageIndex = 0;
    this.page.pageSize = 5;
    this.page.totalCount = 0;
  }

  ngOnInit() {
    const params = {
        start_index : 0,
        page_size: 5
    };

   /* this.adminService.findNews(parmas)
      .subscribe(body =>
        console.log(body);
      // body의 data 필드를 newsList에 담기
      // any를 VO로 할려니깐 에러.
      // Object.assign(this.newsList, body);

      // 정답
      this.newsList = body.data;
      console.log('######');
      console.log(this.newsList); )*/

    this.adminService.findNews(params)
      .subscribe(body => {
        console.log(body);
        // body의 data 필드를 newsList에 담기
        // this.newsList = body.data;
        // console.log('####');
        // console.log(this.newsList);
      });
  }

}
