import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book.interface';
import { AlertService } from './alert.service';

@Injectable()
export class BooksService {
  private path: string = 'https://www.googleapis.com/books/v1/volumes?';
  private bookPath: string = 'https://www.googleapis.com/books/v1/volumes';
  private key: string = environment.key;

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getBooks(
    title: string,
    sort: string,
    category: string,
    startIndex: number = 0
  ): Observable<Book> {
    if (category === 'all') {
      return this.http.get<Book>(
        `${this.path}q=${title}+intitle&orderBy=${sort}&startIndex=${startIndex}&maxResults=30&key=${this.key}`
      );
    }
    return this.http.get<Book>(
      `${this.path}q=${title}+intitle+subject:${category}&orderBy=${sort}&maxResults=30&key=${this.key}`
    ).pipe(catchError(this.errorHandler<Book>('Get books')));
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.bookPath}/${id}`).pipe(catchError(this.errorHandler<Book>("Get book by ID")));
  }

  private errorHandler<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  log(message: string) {
    this.alertService.add(message);
  }
}
