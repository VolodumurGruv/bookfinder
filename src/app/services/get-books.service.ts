import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book } from '../shared/book.interface';

@Injectable()
export class GetBooksService {
  private subject = new Subject<Book>();

  sendData(data: Book) {
    this.subject.next(data);
  }

  getData(): Observable<Book> {
    return this.subject.asObservable();
  }
}
