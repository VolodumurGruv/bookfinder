import { NgModule } from '@angular/core';
import { BooksRoutingModule } from './books-routing.module';
import { MaterialModule } from '../material.module';

import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';

@NgModule({
  declarations: [BooksComponent, BookComponent],
  imports: [BooksRoutingModule, MaterialModule],
  exports: [],
})
export class ComponentsModule {}
