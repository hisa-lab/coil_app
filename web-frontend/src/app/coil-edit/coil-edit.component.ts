import { Component, OnInit } from '@angular/core';
import { Coil, CoilApi } from '../../../lb-sdk';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';  // ViewChildã‚’import
@Component({
  selector: 'app-coil-edit',
  templateUrl: './coil-edit.component.html',
  styleUrls: ['./coil-edit.component.scss']
})

export class CoilEditComponent implements OnInit {
  form: FormGroup;
  selectedVal: string;
  constructor(private CoilApi: CoilApi, private router: Router, ) {

    this.form = new FormGroup({
      coil: new FormControl('', [
        Validators.required
      ])
    });
  }
  level: string;
  category: string;
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


  coils: Coil[];
  send_coil: any;
  // コイル式問題を様式に沿っているか確認し、追加
  Submit() {
    //console.log(this.form.value.coil);
    //console.log(this.level);

    //console.log(this.category);
    if (this.level === undefined || this.category === undefined) {
      alert("難易度とカテゴリを選択してください");
    }
    else {
      this.send_coil = JSON.parse(this.form.value.coil);
      if (this.send_coil.length < 0) {
        alert("１つ以上の問題を入力してください");
      }
      for (const coil of this.send_coil) {
        if (coil.keyword === undefined || coil.coilword === undefined) {
          alert("問題に不備があります");
          break;
        } else {
          coil.level = this.level;
          coil.category = this.category;
          //console.log("set", coil);
        }


        this.CoilApi.patchOrCreate(coil).subscribe((coils: Coil[]) => {

          //console.log("Apiset", coils);
        });
      }
    }



    //console.log(this.send_coil);





    // this.CoilApi.patchOrCreate(
    // {
    //   "keyword": "hoge",
    //   "coilword": [
    //     "fuga", "ddd"
    //   ],
    //     "category": "aa",
    //     "level": "staaaa"

    //   }
    // ).subscribe((coils: Coil[]) => {

    // //console.log("Apiset", coils);
    // });


    this.router.navigate(["/"]);


  }

  onValChangeCategory(event) {
    //console.log(event.value.en);
    this.category = event.value.en;
    //console.log(this.category);
  }
  onValChangeLevel(event) {
    this.level = event.value.en;
    //console.log(this.level);
  }

  // ??????????


  // coil: any;
  // send_coil() {
  //   this.CoilApi.patchOrCreate({
  //     "keyword": "fuga",
  //     "coilword": [
  //       "fuga", "saaga"
  //     ]
  //   }).subscribe((coils: Coil[]) => {

  //   //console.log("Apiset", coils);
  //   });
  // }

  ngOnInit() {
  }

}
