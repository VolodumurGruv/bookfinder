import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book } from '../interfaces/book.interface';

@Injectable()
export class GetBookService {
  private bookSubj = new Subject<Book[]>();

  bookSubj$ = this.bookSubj.asObservable();

  getBook(): Observable<Book[]> {
    return this.bookSubj$;
  }

  sendBook(data: Book[]) {
    this.bookSubj.next(data);
  }
}
