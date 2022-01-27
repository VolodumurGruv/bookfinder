import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    startIndex: number = 0,
    maxResults: number = 30
  ): Observable<Book> {
    if (category === 'all') {
      return this.http
        .get<Book>(
          `${this.path}q=${title}+intitle&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResults}&key=${this.key}`
        )
        .pipe(catchError(this.errorHandler<Book>('Get books')));
    }
    return this.http
      .get<Book>(
        `${this.path}q=${title}+intitle+subject:${category}&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResults}&key=${this.key}`
      )
      .pipe(catchError(this.errorHandler<Book>('Get books')));
  }

  getBookById(id: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.bookPath}/${id}`)
      .pipe(catchError(this.errorHandler<Book>('Get book by ID')));
  }

  private errorHandler<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 0) {
        const msg = error.message.split(' ').splice(0, 3).join(' ');

        console.error(error);
        this.log(
          `${operation} failed: ${msg}. It will be fixed soon. Please, try again or later!`
        );
        return of(result as T);
      }
      console.error(error);
      this.log(`${operation} failed: ${error.error.error.message}`);
      return of(result as T);
    };
  }

  log(message: string) {
    this.alertService.add(message);
  }
}
