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
  public spiner!: boolean;
  public disabled = true;
  public totalItems = 0;

  private searchParams: SearchParam = {
    title: '',
    sort: '',
    category: '',
    startIndex: 0,
  };
  private subMore!: Subscription;

  constructor(private router: Router, private booksService: BooksService) {}

  ngOnInit(): void {}

  addBooks(event: any) {
    this.spiner = true;
    this.totalItems = event.totalItems;
    this.books = event.items;
    if (this.totalItems) {
      this.disabled = false;
      this.spiner = false;
    }
  }

  bookDetalies(idx: string) {
    this.router.navigate(['/book', idx]);
  }

  getParams(event: SearchParam) {
    this.searchParams.startIndex = 0;
    this.searchParams = event;
  }

  // getting next 30 books
  showMore() {
    this.searchParams.startIndex += 30;

    this.subMore = this.booksService
      .getBooks(
        this.searchParams.title,
        this.searchParams.sort,
        this.searchParams.category,
        this.searchParams.startIndex
      )
      .pipe(
        tap((res: any) => {
          // cheking for displaying button
          if (!res['items']) {
            this.disabled = true;
            this.searchParams.startIndex = 0;
          }
          if (res['items']) {
            this.books.push(...res['items']);
          }
        })
      )
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
      this.disabled = false;

      console.log('default');
    }
  }
}
