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
  tempTodoMap = new Map<number, TodoVO>(); // typescript + es6



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

  save(todo: TodoVO) {
    // 템플릿 전환
    todo.isEdited = true;

    // 기존값 저장
    // CASE1 : 실수 많이 하는 케이스
    // const tempTodo = todo; // 같은 메모리 주소 바라봄
    // this.tempTodoMap.set(tempTodo.todo_id, tempTodo);

    // deep copy하는 두가지 방법,
    // 1.Object.assign
    //const tempTodo = Object.assign({}, todo, {todo: 'aaa'}); // 기존의 todo에 overwrite
    const tempTodo = Object.assign({}, todo);

    // 2. es6 spread연산자


    // const tempTodo = new TodoVO();
    // tempTodo.todo_id = todo.todo_id;
    // tempTodo.todo = todo.todo;
    // tempTodo.isFinished = todo.isFinished;
    this.tempTodoMap.set(tempTodo.todo_id, tempTodo);
  }

  restore(todo: TodoVO) {


    // 기존값 복원
    const tempTodo = this.tempTodoMap.get(todo.todo_id);
    // todo = tempTodo;
    Object.assign(todo, tempTodo);

    // 템플릿전환
    todo.isEdited = false;
  }
}
