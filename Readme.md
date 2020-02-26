# coil_app
coil_app
====
coil_appは、coil式学習法を利用した英単語学習webアプリケーションである。

### 氏名
```
    柴田　薫
```

### 所属
```
    大阪電気通信大学院
    総合情報学研究科
　　コンピュータサイエンス専攻　
    MT18A006　柴田　薫
```


### メールアドレス
```
    mt18a006@oecu.jp
```

## Description
coil_app の構成は、clientとserverに分かれている。  
それぞれの動作内容は以下のようになっている。

### client  
coil式学習法を模したクロスワード形式で問題に回答する
回答すると採点が行われる
管理者は問題を追加することが出来るようになっている。

### server  
要求されたキーワードの問題を返すAPI
問題を、難易度、カテゴリで分類している。
難易度とカテゴリは以下の通り
* カテゴリ
    * 文化・芸術
    * スポーツ
    * レクリエーション
    * 政治
    * 料理・食事
    * 家庭・暮らし
    * ビジネス
    * 科学・技術
    * 教育・学習
    * 交通
    * 健康・医学
    * メディア
    * その他


* 難易度
    * 中学以上の水準
    * 高校1年以上の水準
    * 高校2年以上の水準
    * 高校3年以上の水準
    * 大学以上の水準
    * 大学院以上の水準


## 準備するもの
* coil_generation で用意した words.json
* coil_generation で生成した coils.json
## Install
```
  1. web-backend/jsonにwords.jsonとcoils.jsonを置く
  2. docker-compose build
  3. docker-compose up
```

## デプロイ
```
  //ログインパスワードは https://github.com/settings/tokens でトークンを生成し、そのトークンでログイン
  docker login docker.pkg.github.com --username githubのユーザー名
  //プッシュ
  docker push docker.pkg.github.com/githubのユーザー名/coil_app/coil-app:latest
  //プル
  docker pull docker.pkg.github.com/githubのユーザー名/coil_app/coil-app:latest
  //起動
  docker-compose -f docker-compose.deploy.yml up -d

  //初めての場合はタグ付け
  docker tag docker.pkg.github.com/githubのユーザー名/coil_app/coil-app:latest docker.pkg.github.com/githubのユーザー名/coil_app/coil-app:latest
```