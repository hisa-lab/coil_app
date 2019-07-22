import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Coil, CoilApi, Answers, AnswersApi } from '../../../lb-sdk';
import { AuthdataService } from '../authdata.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  answers: Answers[];
  account: any;
  constructor(private CoilApi: CoilApi,
    private AnswersApi: AnswersApi,
    public AuthdataService: AuthdataService,
    public changeDetectorRef: ChangeDetectorRef
  ) { }
  coils: Coil[];
  ans_rate: number;
  ans_state: any;
  levels: any = [
    {
      en: "Middle_school",
      ja: "中学",
    },
    {
      en: "High_school_1",
      ja: "高校1年",
    },
    {
      en: "High_school_2",
      ja: "高校2年",
    },
    {
      en: "High_school_3",
      ja: "高校3年",
    },
    {
      en: "University",
      ja: "大学",
    },
    {
      en: "Graduate",
      ja: "大学院",
    }
  ];
  categorys: any = [
    {
      en: "Culture",
      ja: "文化・芸術"
    },
    {
      en: "Sports",
      ja: "スポーツ"
    },
    {
      en: "Recreation",
      ja: "レクリエーション"
    },
    {
      en: "Politice",
      ja: "政治"
    },
    {
      en: "Cuisine",
      ja: "料理・食事"
    },
    {
      en: "Home",
      ja: "家庭・暮らし"
    },
    {
      en: "Business",
      ja: "ビジネス"
    },
    {
      en: "Science",
      ja: "科学・技術"
    },
    {
      en: "Education",
      ja: "教育・学習"
    },
    {
      en: "Traffic",
      ja: "交通"
    },
    {
      en: "Health",
      ja: "健康・医学"
    },
    {
      en: "Media",
      ja: "メディア"
    },
    {
      en: "Other",
      ja: "その他"
    }
  ];

  sort_data: any = {
    level: "Middle_school",
    category: "Culture"
  }
  // カテゴリ部分を変更されたときに検索条件を変更
  onClickCategory(event) {
    this.sort_data.category = this.categorys[event.index].en;
    //('sort_data => ', this.sort_data);
    this.load_coils();
  }
  // 難易度部分を変更されたときに検索条件を変更
  onClickLevel(event) {
    //console.log(this.levels[event.index].en);
    this.sort_data.level = this.levels[event.index].en;
    //console.log('sort_data => ', this.sort_data);
    this.load_coils();
  }
  // 回答状態を確認
  state(id) {
    let ans_state = this.answers.filter(function (item, index) {
      if (item.coilId === id) {
        return true;
      }
    });
    if (ans_state.length > 0) {
      //console.log(ans_state);
      if (ans_state[0].mark && this.AuthdataService.account.id === ans_state[0].accountId) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  // コイル式問題一覧を取得
  load_coils() {
    let ans_count = 0;
    this.CoilApi.find({
      where: {
        level: this.sort_data.level,
        category: this.sort_data.category
      }
    }).subscribe((coil: Coil[]) => {
      this.coils = coil;
      //console.log('coil => ', coil);
      for (const word of this.coils) {
        if (this.state(word.id)) {
          ans_count++;
        }
      }

      if (ans_count > 0) {
        this.ans_rate = Math.floor((ans_count / this.coils.length) * 100);
      } else {
        this.ans_rate = 0;
      }
      console.log(ans_count);

    });
  }

  ngOnInit() {
    (async () => {
      this.account = await this.AuthdataService.account;
      await this.AnswersApi.find({
        where: {
          accountId: this.account.id,
        }
      }).subscribe((answers: Answers[]) => {
        this.answers = answers;

        //console.log('ans => ', answers);
      });
      await console.log("acount", this.AuthdataService.account);
      await this.load_coils();
      this.changeDetectorRef.detectChanges();
    })();
  }

}
