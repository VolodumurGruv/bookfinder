import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Book } from 'src/app/interfaces/book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public books!: Book[];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  addBooks(event: any) {
    console.log([...event.items]);
    this.books = event.items;
    console.log(event);
  }

  bookDetalies(id: string) {
    this.router.navigate(['/book', id]);
  }
  showMore() {}
}
