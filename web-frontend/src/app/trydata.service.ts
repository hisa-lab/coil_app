import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrydataService {
  public mistake: any;
  constructor() { }
  review_word_get() {
    let random = Math.floor(Math.random() * this.mistake.length);
    return this.mistake[random];
  }
}
