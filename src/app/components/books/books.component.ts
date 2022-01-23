import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/shared/book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public books!: Book;

  ngOnInit(): void {}

  bookDetalies() {}
  showMore() {}
}
