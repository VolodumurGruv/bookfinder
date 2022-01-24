import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/interfaces/book.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [BooksService],
})
export class SearchComponent implements OnInit {
  private categoryValue = 'all';
  private sortValue = 'relevance';
  public books!: Book[];

  @Output() addBooks = new EventEmitter<Book[]>();

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

  search(event: string): void {
    if (event) {
      this.booksService
        .getBooks(event.trim(), this.sortValue, this.categoryValue)
        .pipe(
          tap((res: any) => {
            this.books = res;
            this.getBooks();
          })
        )
        .subscribe();
    }
  }

  getBooks() {
    if (this.books) {
      this.addBooks.emit(this.books);
      console.log(this.books);
    }
  }

  returnBooks(): Book[] {
    return this.books;
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
