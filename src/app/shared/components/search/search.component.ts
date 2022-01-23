import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/shared/book.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private categoryValue = 'all';
  private sortValue = 'relevance';
  public books!: Book;

  constructor(
    private booksService: BooksService,
  ) {

  }

  ngOnInit(): void {}

  search(event: string): void {
    if (event) {
      console.log(
        `sort ${this.sortValue}\n category ${this.categoryValue}\n serach ${event}`
      );
      this.booksService
        .getBooks(event.trim(), this.sortValue, this.categoryValue)

        .subscribe();
    }
  }

  sort(s: string): void {
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
