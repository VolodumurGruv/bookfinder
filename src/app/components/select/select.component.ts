import { Component, EventEmitter, OnInit, Output } from '@angular/core';

type Sort = string[];
type Categories = string[];
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

  selectedSort(event: string) {
    if (event) {
      this.selectSort.emit(event);
    }
  }

  selectedCategory(event: string) {
    if (event) {
      this.selectCategory.emit(event);
    }
  }
}
