import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TrydataService } from '../trydata.service';

import {
  Coil,
  CoilApi,
  AccountApi,
  Account,
  Answers,
  AnswersApi,
  Words,
  WordsApi,
  Questions,
  QuestionsApi
} from '../../../lb-sdk';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private CoilApi: CoilApi,
    private AnswersApi: AnswersApi,
    private AcauntApi: AccountApi,
    private WordsApi: WordsApi,
    private QuestionsApi: QuestionsApi,
    public TrydataService: TrydataService
  ) { }
  miss_word: any = this.route.snapshot.params['missword'];
  WordData: Words;
  speech_word: string;
  speech_set: any;
  word: any;
  condition: boolean = false;
  maxlength: number;
  value: number;
  // ホーム画面へ
  home() {
    this.router.navigate(["/home"]);
  }
  // 不正解問題単語の情報を取得
  load_word_data() {
    this.WordsApi.findOne({
      where: {
        eng: this.miss_word
      }
    }).subscribe((Words: Words) => {

      this.WordData = Words;
      if (this.WordData.imgURL === null) {
        this.WordData.imgURL = "no image"
      }
      //console.log(Words)
    });
  }
  // 与えられた単語を英語で再生
  speech(word) {

    this.speech_word = word;
    this.speech_set = new SpeechSynthesisUtterance();
    this.speech_set.lang = 'en-US';
    this.speech_set.text = this.speech_word;
    speechSynthesis.speak(this.speech_set);

  }
  // 単語を問題形式にし、復習問題として提供
  load_question() {
    this.QuestionsApi.findOne({
      where: {
        example: this.miss_word
      }
    }).subscribe((Questions: Questions) => {
      //console.log(Questions);
      this.word = Questions;
    });
  }

  next(event) {
    if (this.value == this.maxlength) {
      let element = event.srcElement.nextElementSibling; // get the sibling element
      let elements = document.getElementsByClassName('input-eng');
      //console.log(elements);
      if (element == null)  // check if its null
        return;
      else
        element.focus();   // focus if not null
    }
  }
  //文字を入力されたらオートフォーカス
  autofocus(col: number, event: any) {
    let now: number = (() => {
      let sum = 0;
      sum += col;
      return sum;
    })();
    let elements = document.getElementsByClassName('input-eng');
    if (event.key === "Backspace" && now > 0) {
      let backe = <HTMLElement>elements[now - 1].children[0];
      backe.focus();
    }
    if (event.key !== "Backspace" && elements.length > now + 1) {
      let nexte = <HTMLElement>elements[now + 1].children[0];
      nexte.focus();
    }
    if ((this.word.en.length - 1) === col) {
      this.judge();
      this.condition = true;
    }
  }
  // 復習問題の採点
  judge() {
    if (this.word.ans.toString() === this.word.en.toString()) {
      this.word.judge = "○";
    } else {
      this.word.judge = "×";
    }
    return
  }
  // 他の復習問題を取得し、初期化
  review() {
    this.miss_word = this.TrydataService.review_word_get();
    this.load_question();
    this.load_word_data();
  }
  ngOnInit() {
    (async () => {
      await this.load_question();
      await this.load_word_data();
      await console.log(this.miss_word)
      await console.log(this.WordData)
    })();
  }

}
