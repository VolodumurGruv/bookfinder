import { Component, EventEmitter, Output } from '@angular/core';

type Sort = string[];
type Categories = string[];
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Output() selectSort = new EventEmitter<string>();
  @Output() selectCategory = new EventEmitter<string>();

  public categories: Categories = [
    'all',
    'art',
    'biography',
    'computers',
    'history',
    'medical',
    'poetry',
  ];
  public sorts: Sort = ['relevance', 'newest'];
  public categoryValue = 'all';
  public sortValue = 'relevance';

  selectedSort(event: string): void {
    if (event) {
      this.selectSort.emit(event);
    }
  }

  selectedCategory(event: string): void {
    if (event) {
      this.selectCategory.emit(event);
    }
  }
}
