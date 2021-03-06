import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BooksRoutingModule } from './books-routing.module';
import { MaterialModule } from '../material.module';

import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { SearchComponent } from './search/search.component';
import { SelectComponent } from './select/select.component';
import { CommonModule } from '@angular/common';
import { ProgressSpinerComponent } from './progress-spiner/progress-spiner.component';

@NgModule({
  declarations: [
    BooksComponent,
    BookComponent,
    SearchComponent,
    SelectComponent,
    ProgressSpinerComponent,
  ],
  imports: [CommonModule, BooksRoutingModule, MaterialModule],
  exports: [BooksRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
