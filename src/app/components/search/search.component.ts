import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/interfaces/book.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [BooksService],
})
export class SearchComponent implements OnInit {
  @Input() startIndex!: any;
  @Output() addBooks = new EventEmitter<Book[]>();

  private categoryValue = 'all';
  private sortValue = 'relevance';
  public books!: Book[];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {}

  search(event: string): void {
    this.booksService
      .getBooks(event.trim(), this.sortValue, this.categoryValue, this.startIndex)
      .pipe(
        tap((res: any) => {
          this.books = res;
          this.getBooks();
        })
      )
      .subscribe();
  }

  getBooks() {
    if (this.books) {
      this.addBooks.emit(this.books);
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
