# 献立DB

## なにをするものか
* 過去に作った献立を登録して献立を考える際にDBを使用して、ある程度提案してくれるサービス

## 実装予定の機能
* 使用した献立をみて、次の日とかの献立も提案してくれる
    * この献立を使用した次の日はこれを作ってたみたいな
    * 天候や季節をみて提案内容を変えるとある程度ループを避けられるかも？
* 好き嫌いを考慮して提案
# 利用方法

## 開発時
* 以下の拡張機能を入れておくこと
    * VSCode Angular TypeScript & Html Snippets
    * EditorConfig for Visual Studio Code
    * ESLint
    * TSLint
* web-frontend web-backend それぞれのディレクトリで`npm install`
    * 無くても動くが、VSCodeにエラーが出る
* 以下のコマンドを実行後`http://localhost:4200`にアクセス
```
$ docker-compose up
```
* バックエンドのAPIサーバは `http://localhost:3000`で稼働している
    * WebpackDevServerによりリバースプロクシされているため必要ない
        * `http://localhost:3000/api` → `http://localhost:4200/api`
* HMRが有効になっているため、フロントエンドの開発の場合、リロードは不要
* Nodemonで起動しているため、バックエンドの開発の場合も、リロードは不要

## 開発時（パッケージ追加時)
```
$ docker-compose down
$ docker-compose build --no-cache
$ docker-compose up
```

## 開発時 (Loopbackモデル変更時)
* Loopback側は自動的に再起動するが、lb-sdkによるモデルの再生成が行われないので、以下のコマンドで再起動を行う
    * 毎回生成してもいいが遅い
```
$ docker-compose down
$ docker-compose up
``` 
## デプロイ
* 以下のコマンドを実行後、`3005`ポートで起動している
* Webpack がminify等を行うため、１分程度かかる
* どこかでビルド & Push して、デプロイ先で pull を推奨
```
$ docker-compose -f docker-compose.prod.yml build --no-cache
$ docker-compose -f docker-compose.prod.yml up -d
```

# 注意点
* Docker on Windows でも動く書き方にすること
* ChangeStramを使うとなんか死ぬ
  * あまり大量に同時接続することは想定されていない模様
  * WebpackDevServerが対応していない？
* dockerで立ち上げる時に、VSCode(の拡張機能のESLint等)がファイルをロックしていて、失敗することがあった
