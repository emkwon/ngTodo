import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({ // app모듈에 선언되어있어야함
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input()
  private highlightColor: string;


  constructor(private el: ElementRef) {
    // el.nativeElement 가 자바스크립트 node 객체를 가져온다.
    el.nativeElement.style.backgroundColor = 'yellow';
  }

 // 색을 넘겨받는 방법

  @HostListener('mouseenter')
  mouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave')
  mouseLeave() {
    this.el.nativeElement.style.backgroundColor = null;
  }

}
