import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { searchParams } from 'src/app/config/config';

import { Book, SearchParam } from 'src/app/interfaces/book.interface';
import { BooksService } from 'src/app/services/books.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [BooksService],
})
export class BooksComponent implements OnInit, OnDestroy {
  public books!: Book[];
  public disabled = true;
  public totalItems = 0;

  public spinner$ = this.spinnerService.spinner$;

  private searchParams: SearchParam = searchParams;
  private subMore!: Subscription;

  constructor(
    private router: Router,
    private booksService: BooksService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    if (Object.values(localStorage).length) {
      this.searchParams.title = localStorage.getItem('title') || '';
      this.searchParams.sort = localStorage.getItem('sort') || 'relevance';
      this.searchParams.category = localStorage.getItem('category') || 'all';
      this.searchParams.startIndex = 0;

      this.subMore = this.booksService
        .getBooks(
          this.searchParams.title,
          this.searchParams.sort,
          this.searchParams.category,
          this.searchParams.startIndex
        )
        .pipe(
          tap((res: any) => {
            // cheking for displaying button and spinner
            if (!res['items']) {
              this.disabled = true;
              this.searchParams.startIndex = 0;
            }

            if (res['items']) {
              this.totalItems = res.totalItems;
              this.disabled = false;

              this.books = res['items'];
            }
          })
        )
        .subscribe();
    }
    // if you want to continue keeping storage
    //after oninit delete the line below
    localStorage.clear();
  }

  addBooks(event: any): void {
    this.totalItems = event.totalItems;
    this.books = event.items;

    if (this.totalItems) {
      this.disabled = false;
    }
  }

  bookDetalies(idx: string): void {
    localStorage.clear();
    this.router.navigate(['/book', idx]);
  }

  getParams(event: SearchParam): void {
    this.searchParams.startIndex = 0;
    this.searchParams = event;
  }

  // getting next 30 books
  showMore(): void {
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

      localStorage.clear();
    }
  }
}
