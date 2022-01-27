import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { Book, SearchParam } from 'src/app/interfaces/book.interface';
import { Subscription } from 'rxjs';
import { searchParams } from 'src/app/config/config';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [BooksService],
})
export class SearchComponent implements OnDestroy {
  @Output() redirect = new EventEmitter<string>();
  @Output() addBooks = new EventEmitter<Book[]>();
  @Output() getParams = new EventEmitter<SearchParam>();

  public panelOpenState = false;

  private searchParams: SearchParam = searchParams;
  private subBooks!: Subscription;
  private books!: Book[];

  constructor(private booksService: BooksService) {}

  search(event: string): void {
    this.searchParams.title = event.trim();

    this.booksService
      .getBooks(
        this.searchParams.title,
        this.searchParams.sort,
        this.searchParams.category,
        this.searchParams.startIndex
      )
      .pipe(
        tap((res: any) => {
          this.books = res;
          this.getBooks();
        })
      )
      .subscribe();
    // redicrect
    this.goBack();
  }
  // passing data to books component
  getBooks(): void {
    this.addBooks.emit(this.books);
    this.getParams.emit(this.searchParams);
  }

  //getting value from selects
  sort(s: string): void {
    if (s) {
      this.searchParams.sort = s.trim();
    }
  }

  category(c: string): void {
    if (c) {
      this.searchParams.category = c.trim();
    }
  }
  // redirect to '/' (home)
  goBack(): void {
    if (this.searchParams.title) {
      localStorage.setItem('title', this.searchParams.title);
      localStorage.setItem('sort', this.searchParams.sort);
      localStorage.setItem('category', this.searchParams.category);
      localStorage.setItem(
        'startIndex',
        this.searchParams.startIndex.toString()
      );
    }

    this.redirect.emit('/');
  }

  ngOnDestroy(): void {
    if (this.subBooks) {
      this.subBooks.unsubscribe();
      this.searchParams.startIndex = 0;
    }
  }
}
