import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { GetBooksService } from 'src/app/services/get-books.service';
import { Book } from 'src/app/shared/book.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [BooksService, GetBooksService],
})
export class SearchComponent implements OnInit {
  private categoryValue = 'all';
  private sortValue = 'relevance';
  public books!: Book;

  constructor(
    private booksService: BooksService,
    private bs: GetBooksService
  ) {}

  ngOnInit(): void {}

  search(event: string): void {
    if (event) {
      console.log(
        `sort ${this.sortValue}\n category ${this.categoryValue}\n serach ${event}`
      );
      this.booksService
        .getBooks(event.trim(), this.sortValue, this.categoryValue)
        .pipe(
          tap((res: any) => {
            this.books = res;
            this.bs.sendData(res);
          })
        )
        .subscribe();
    }
  }

  sort(s: string): void {
    console.log(this.books);
    if (s) {
      this.sortValue = s.trim();
    }
  }

  category(c: string): void {
    if (c) {
      this.categoryValue = c.trim();
    }
  }
}
