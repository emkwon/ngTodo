import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from './index/index.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import {RouterModule, Routes} from '@angular/router';
import {MatAccordion, MatCardModule, MatExpansionModule, MatMenuPanel, MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdminService} from './admin.service';


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
    MatToolbarModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatCardModule,
  ],
  declarations: [IndexComponent, HomeComponent, NewsComponent],
  providers: [AdminService],
})
export class AdminModule { }
