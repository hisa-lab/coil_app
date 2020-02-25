import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrydataService {
  public mistake: any;
  public clear_word: string[] = [null];
  public data: any;
  constructor() { }
  clear_word_listin(coilid) {
    this.clear_word.push(coilid);
    localStorage.setItem('json', JSON.stringify(this.clear_word));
    this.data = localStorage.getItem('json');
    this.clear_word = JSON.parse(this.data);
  }
  word_state(id) {
    if (localStorage.getItem('json') === null) {
      localStorage.setItem('json', JSON.stringify(this.clear_word));
      this.data = localStorage.getItem('json');
      this.clear_word = JSON.parse(this.data);
    } else {
      this.data = localStorage.getItem('json');
      this.clear_word = JSON.parse(this.data);
    }

    // console.log(this.clear_word);
    if (this.clear_word.indexOf(id) !== -1) {
      // console.log("OK");
      return true;
    }
    else {
      // console.log("NG");
      return false;
    }
  }
  review_word_get() {
    let random = Math.floor(Math.random() * this.mistake.length);
    return this.mistake[random];
  }
}
