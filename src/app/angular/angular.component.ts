///<reference path="../../../node_modules/@angular/animations/src/animation_metadata.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TodoVO} from '../domain/todo.vo';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translate(0, 0)'})),
      transition('void => in', [
        style({opacity: 0, transform: 'translate(-100%, 0)'}),
        animate(300) // animate(시간, 종료상태)
      ]),
      /*transition('* => void', [
        animate(300, style({transform: 'translate(0, -100%)', opacity: '0'}))
      ])*/
    ])


  ]
})
export class AngularComponent implements OnInit {

  todoList: TodoVO[] = [];
  newTodo: TodoVO = new TodoVO();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getTodoList()
      .subscribe(body => {
        this.todoList = body;
        console.log(this.todoList);
      });
  }

  addTodo() {
    this.userService.addTodo(this.newTodo)
      .subscribe(body => {
        // todoList 맨앞에 삽입
        console.log(body);
        console.log(this.todoList);
        this.todoList.unshift(body);
        console.log(this.todoList);
      })
    ;
  }

}
