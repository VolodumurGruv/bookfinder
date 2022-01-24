import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  book() {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     this.service.getBooks(params.get(id));
    //   })
    // );
  }
}
