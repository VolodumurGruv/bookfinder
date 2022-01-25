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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [BooksService],
})
export class SearchComponent implements OnInit, OnDestroy {
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

  constructor(private booksService: BooksService, private router: Router) {}

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
          console.log(res);
          this.books = res;
          this.getBooks();
        })
      )
      .subscribe();
  }
  // passing data to books component
  getBooks() {
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

  ngOnDestroy(): void {
    if (this.subBooks) {
      this.subBooks.unsubscribe();
      this.searchParams.startIndex = 0;
    }
  }
}
