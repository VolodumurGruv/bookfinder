import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Book } from 'src/app/interfaces/book.interface';
import { BooksService } from 'src/app/services/books.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [BooksService],
})
export class BookComponent implements OnInit {
  public book$!: Observable<Book>;
  public lang!: any;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.book();
  }

  book(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.bookService.getBookById(params['params']['id']);
      })
    );
  }

  redirect(event: string): void {
    this.router.navigate([event]);
  }
}
