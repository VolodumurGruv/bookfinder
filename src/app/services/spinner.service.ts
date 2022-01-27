import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private spinner = new Subject<boolean>();

  public spinner$ = this.spinner.asObservable();

  show() {
    this.spinner.next(true);
  }

  hidde() {
    this.spinner.next(false);
  }
}
