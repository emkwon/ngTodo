export class PageVO {
  // pageIndex: number;
  // pageSize: number;
  // totalCount: number;
  // pageOptions: number[];

  /*
  constructor(pageSize: number) {
    this.pageSize = pageSize; // java 스타일
  } */

  // constructor는 하나만..
  // ? -> optional 연산자, ? 연산자는 반드시 뒤로
  constructor(public pageIndex: number, public pageSize: number, public totalCount: number,
              public  pageSizeOptions?: number[]) { // 상단에 서언문 없어도 됨, type script 문법
    if (!pageSizeOptions) {
      this.pageSizeOptions = [5, 15, 30, 60, 120];
    }
  }


}
