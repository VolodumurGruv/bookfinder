import { Component } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { GetBooksService } from 'src/app/services/get-books.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [BooksService, GetBooksService],
})
export class LayoutComponent {

}
