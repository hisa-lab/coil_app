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

### 研究内容
```
    英単語の学習法として、coil（Combination Of Initial Letters）式学習法を利用したweb学習システムの開発を行う。
    この学習法は、米津　博志さんが考案した学習法で学習本が出版されている。
    しかし、この学習本は、難易度の幅の大きさ、手作業による問題生成による問題数の少なさなどの問題点がある。
    coil_appでは、この学習法を計算機を使用することによって問題の自動生成及び難易度の詳細化を図り、手軽に学習できるよう様々な機能を実装したwebシステムとして開発を行う。
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

## Requirement

## Usage

#### 学習方法

## Install
```
  docker-compose build
  docker-compose up
```

## デプロイ
```
  //ログインパスワードは https://github.com/settings/tokens で作成したトークンでログイン
  docker login docker.pkg.github.com --username 0kaoru0
  //プッシュ
  docker push docker.pkg.github.com/0kaoru0/coil_app/coil-app:latest
  //プル
  docker pull docker.pkg.github.com/0kaoru0/coil_app/coil-app:latest
  //起動
  docker-compose -f docker-compose.deploy.yml up -d

  //初めての場合はタグ付け
  docker tag docker.pkg.github.com/0kaoru0/coil_app/coil-app:latest docker.pkg.github.com/0kaoru0/coil_app/coil-app:latest
```