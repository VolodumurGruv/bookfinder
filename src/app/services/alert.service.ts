import { Injectable } from '@angular/core';
@Injectable()
export class AlertService {
  public messages: string[] = [];
  add(message: string) {
    this.messages.push(message);

    const clearTime = setTimeout(() => {
      clearTimeout(clearTime);
      this.clear();
    }, 8000);
  }

  clear() {
    this.messages = [];
  }
}
