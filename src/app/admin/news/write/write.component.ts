import { Component, OnInit } from '@angular/core';
import {NewsVO} from '../../../domain/news.vo';
import {AdminService} from '../../admin.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  news = new NewsVO();
  fileList: FileList; // 선언
  constructor(private adminService: AdminService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  addNews() {
    this.adminService.addNews(this.news)
      .subscribe(body => {
        if (body.result === 0) {
          // success
          this.snackBar.open('등록하였습니다.', null, {duration: 3000});
          this.router.navigateByUrl('/admin/news');
        }
      });

    // 2) 이벤트 발생자 : 뉴스 등록 이벤트 발생
    this.adminService.refresh.next(true);
  }

  fileChange(event: any) {
    // 여러개의 파일중 첫번째 파일을 가져와서 File API의 FileReader 객체를 이용해서 읽는다.
    this.fileList = event.target.files;
    console.log(this.fileList);
   // show thumbnail
    const reader = new FileReader();
    reader.readAsDataURL((this.fileList[0]));
    reader.onload = () => {
      // this.thumbnailSrc = reader.result;
       this.imageUpload();
    };
  }

  // 서버에 이미지 전송
  imageUpload() {
    const formData: FormData = new FormData();
    formData.append('a', 'b');
    formData.append('file', this.fileList[0], this.fileList[0].name);

    this.adminService.imageUpload(formData).subscribe(body => {
      console.log(body);
      if (this.news.content) {
        this.news.content += `<img src="http://www.javabrain.kr${body['value']}" style="max-width: 100%;"">`;
      } else {
        this.news.content = `<img src="http://www.javabrain.kr${body['value']}" style="max-width: 100%;">`;
      }
    });



    /*
    if (this.fileList && this.fileList.length > 0) {
      const file: File = this.fileList[0];
      formData.append('file', file, file.name);
      this.adminService.imageUpload(formData)
        .then(res => { if (res['result'] === 0) {
          // 이미지 경로를 editor 에 추가한다 .
          console.log(res['value']);
          if (this.news.content) {
            this.news.content += `<img src="http://www.javabrain.kr${res['value']} style="max-width: 100%;"">`;
          } else {
            this.news.content = `<img src="http://www.javabrain.kr${res['value']}" style="max-width: 100%;">`;
          }

        }
        });
    }*/
  }



}
