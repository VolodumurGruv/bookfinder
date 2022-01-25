import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from 'src/app/interfaces/book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public books!: Book[];
  public book!: Book[];
  public startIndex: number = 0;
  public totalItems!: number;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  addBooks(event: any) {
    this.totalItems = event.totalItems;
    this.books = event.items;
  }

  bookDetalies(idx: string) {
    this.router.navigate(['/book', idx]);
  }

  showMore() {
    this.startIndex += 30;
  }
}
