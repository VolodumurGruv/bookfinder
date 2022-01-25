import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Book, SearchParam } from 'src/app/interfaces/book.interface';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BooksService],
})
export class BooksComponent implements OnInit, OnDestroy {
  public books!: Book[];
  public totalItems!: number;
  public spiner!: boolean;
  public disabled = false;

  private searchParams!: SearchParam;
  private subMore!: Subscription;

  constructor(private router: Router, private booksService: BooksService) {}

  ngOnInit(): void {}

  addBooks(event: any) {
    console.log(event);
    this.totalItems = event.totalItems;
    this.books = event.items;
    if (this.books.length) {
      this.disabled = true;
    }
  }

  bookDetalies(idx: string) {
    this.router.navigate(['/book', idx]);
  }

  getParams(event: SearchParam) {
    this.searchParams = event;
  }
  // getting next 30 books
  showMore() {
    this.searchParams.startIndex += 30;
    this.booksService
      .getBooks(
        this.searchParams.title,
        this.searchParams.sort,
        this.searchParams.category,
        this.searchParams.startIndex
      )
      .pipe(tap((res: any) => this.books.push(...res['items'])))
      .subscribe();
  }
  //setup to default values and unsubscribe
  ngOnDestroy(): void {
    if (this.subMore) {
      this.subMore.unsubscribe();
      this.searchParams.startIndex = 0;
      this.searchParams.title = '';
      this.searchParams.sort = 'relevance';
      this.searchParams.category = 'all';
    }
  }
}
