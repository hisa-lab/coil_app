import { Component, OnInit } from '@angular/core';
import { compileInjectable, analyzeAndValidateNgModules } from '@angular/compiler';
import { forEach } from '@angular/router/src/utils/collection';
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
import { ActivatedRoute } from '@angular/router';
import { AuthdataService } from '../authdata.service';
import { Router } from '@angular/router';
import { async } from 'q';
import {
  trigger,
  state,
  style,
  query,
  animate,
  stagger,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss'],

  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class TryComponent implements OnInit {
  answers: Answers = new Answers;
  constructor(private route: ActivatedRoute,
    private CoilApi: CoilApi,
    private AnswersApi: AnswersApi,
    private AcauntApi: AccountApi,
    private WordsApi: WordsApi,
    public AuthdataService: AuthdataService,
    private router: Router,
    private QuestionsApi: QuestionsApi,
    public TrydataService: TrydataService
  ) { }
  coils: Coil[];
  word: any = {
    en: [],
    ja: "",
    input: [],
    ans: [],
    example: "",
    judge: "〇"
  };
  words: any[];
  coil_keyword: any = this.route.snapshot.params['keyword'];
  condition: any;
  coil: any;
  speech_word: string;
  speech_set: any;
  account: any;
  word_jpn: any;
  //回答をの状態をチェックする
  answer() {
    //すべての回答が正解であれば、その問題はクリア
    //そうでなければ未クリア状態に
    if (this.words.every(word => word.judge === "○")) {
      //問題クリア
      this.answers.mark = true;
    }
    else {
      this.answers.mark = false;
    }
    //回答状態を更新
    this.AnswersApi.find({
      where: {
        coilId: this.coil.id,
        accountId: this.account.id
      }
    }).subscribe((answers: Answers[]) => {
      if (answers.length === 0) {
        this.answers.coilId = this.coil.id;
        this.answers.accountId = this.account.id;
        this.AnswersApi.replaceOrCreate(this.answers).subscribe((answers: Answers = new Answers) => {
        });
      } else {
        answers[0].mark = this.answers.mark;
        this.AnswersApi.replaceOrCreate(answers[0]).subscribe((answers: Answers = new Answers) => {
        });
      }
    });
  }
  //与えられたワードを英語で再生
  speech(word) {
    this.speech_word = word;
    this.speech_set = new SpeechSynthesisUtterance();
    this.speech_set.lang = 'en-US';
    this.speech_set.text = this.speech_word;
    speechSynthesis.speak(this.speech_set);

  }
  // 
  loadCoils() {
    this.CoilApi.find().subscribe((coils: Coil[]) => {
      this.coils = coils;
    });
  }
  //コイルワードの採点
  judge(row: number) {
    if (this.words[row].ans.toString() === this.words[row].en.toString()) {
      this.words[row].judge = "○";
    } else {
      this.words[row].judge = "×";
    }
    return
  }
  maxlength: number;
  value: number;
  // ギブアップの場合はすべてのコイルワードを採点し、回答状態を更新
  giveup() {
    for (let i = 0; i < this.words.length; i++) {

      if (this.words[i].ans.toString() === this.words[i].en.toString()) {
        this.words[i].judge = "○";
      } else {
        this.words[i].judge = "×";
      }
      this.condition = true;
    }
    this.answer();
    this.mistake_ans();
  }
  // 間違えたコイルワードを記憶、サービスに追加
  mistake_ans() {
    let miss = [];
    for (const word of this.words) {
      if (word.judge === "×") miss.push(word.example);
    }
    this.TrydataService.mistake = miss;
  }
  //
  next(event) {
    if (this.value == this.maxlength) {
      let element = event.srcElement.nextElementSibling; // get the sibling element
      let elements = document.getElementsByClassName('input-eng');
      if (element == null)  // check if its null
        return;
      else
        element.focus();   // focus if not null
    }
  }
  // オートフォーカス
  autofocus(row: number, col: number, event: any) {
    let now: number = (() => {
      let sum = 0;
      for (let i = 0; i < row; i++) {
        sum += this.words[i].en.length;
      }
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
    if ((this.words[row].en.length - 1) === col) {
      this.judge(row);
      this.condition = true;
    }
  }
  // 問題の状態を初期化
  init() {
    this.questions_gen(this.coil);
  }
  // 対象の英単語に対しての日本語を問題に追加
  get_words_jpn(words) {
    (async () => {
      for (let i = 0; i < words.length; i++) {
        await this.WordsApi.findOne({
          where: {
            eng: words[i].example
          }
        }).subscribe((Words: Words) => {
          this.word_jpn = Words.jpn;
        });
        words[i].ja = await this.word_jpn;
      }
    })();
  }
  // 回答状態を更新し、ホーム画面へ
  home() {
    this.answer();
    this.router.navigate(["/home"]);
  }
  // 最初の復習単語を取得し、復習画面へ
  review() {
    let word = this.TrydataService.review_word_get();
    let pageURL = "/review/" + word;
    this.router.navigate([pageURL]);
  }
  //問題生成
  questions_gen(coil) {
    let worddata = [];
    for (let i = 0; i < coil.coilword.length; i++) {
      this.QuestionsApi.findOne({
        where: {
          example: coil.coilword[i]
        }
      }).subscribe((Questions: Questions) => {
        this.word = Questions;
        worddata.push(this.word);
      });
    }
    this.words = worddata;
  }
  // 指定されたキーワードでコイル式問題を取得
  loaddata() {
    this.account = this.AuthdataService.account;
    this.CoilApi.findOne({
      where: {
        keyword: this.coil_keyword
      }
    }).subscribe((coil: Coil[]) => {
      this.coil = coil;
      this.questions_gen(this.coil);
    });
  }
  ngOnInit() {
    (async () => {
      await this.loaddata();
    })();
  }


}
