import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { GetBooksService } from 'src/app/services/get-books.service';
import { Book } from 'src/app/shared/book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public booksData!: Book;

  constructor(private bookService: BooksService) {}

  ngOnInit(): void {}

  bookDetalies() {}
  showMore() {}
}
