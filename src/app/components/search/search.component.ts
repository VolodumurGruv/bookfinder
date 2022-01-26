import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { tap } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { Book, SearchParam } from 'src/app/interfaces/book.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [BooksService],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() redirect = new EventEmitter<string>();
  @Output() addBooks = new EventEmitter<Book[]>();
  @Output() getParams = new EventEmitter<SearchParam>();

  private searchParams: SearchParam = {
    title: '',
    sort: 'relevance',
    category: 'all',
    startIndex: 0,
  };
  private subBooks!: Subscription;

  public books!: Book[];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {}

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
    localStorage.setItem('title', this.searchParams.title);
    localStorage.setItem('sort', this.searchParams.sort);
    localStorage.setItem('category', this.searchParams.category);
    localStorage.setItem('startIndex', this.searchParams.startIndex.toString());

    this.redirect.emit('/');
  }

  ngOnDestroy(): void {
    if (this.subBooks) {
      this.subBooks.unsubscribe();
      this.searchParams.startIndex = 0;
    }
  }
}
