import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private adminService: AdminService) {
    // console.log(this.route.url);
    // view 객체를 호출할때, 첫번째만 생성, 두번째부터는 안 찍힌다.
    // => 한번만 생성
    console.log(location.pathname);

    this.route.params.subscribe(parmas => {
        console.log(parmas);
        const news_id = +parmas['news_id']; // 앞에 + 붙이면 스트링이 숫자로 변환
        console.log(news_id);
        this.findOneNews(news_id);
    });
  }

  findOneNews(news_id: number) {
    this.adminService.findOneNews(news_id).subscribe(body => {
      console.log(body);
    });
  }

  ngOnInit() {
  }

}
