import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from './index/index.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import {RouterModule, Routes} from '@angular/router';


const route: Routes = [
  {path: '', component: IndexComponent, children: [
      {path: 'home', component: HomeComponent}, // url경로 : /admin/home
      {path: 'news', component: NewsComponent}
      ]}
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route), // forRoot는 꼭 한번만 쓰기때문에 여기는 child로
  ],
  declarations: [IndexComponent, HomeComponent, NewsComponent]
})
export class AdminModule { }
