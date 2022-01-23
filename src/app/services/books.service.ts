import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../shared/book.interface';

@Injectable()
export class BooksService {
  private path: string = 'https://www.googleapis.com/books/v1/volumes?';
  private key: string = environment.key;
  private counter = 0;

  constructor(private http: HttpClient) {}

  getBooks(title: string, sort: string, category: string): Observable<Book> {
    if (category === 'all') {
      return this.http.get<Book>(
        `${this.path}q=${title}+intitle&orderBy=${sort}&maxResults=30&key=${this.key}`
      );
    }
    return this.http.get<Book>(
      `${this.path}q=${title}+intitle+subject:${category}&orderBy=${sort}&maxResults=30&key=${this.key}`
    );
  }
}
