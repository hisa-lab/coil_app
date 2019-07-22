const fs = require('fs');
module.exports = async app => {
  let ds = app.dataSources.mdb;
  let Account = app.models.Account;
  let words = app.models.words;
  let ValidUser = app.models.ValidUser;
  let Questions = app.models.Questions;
  let Coils = app.models.coil;
  let Tables = [
    'accessToken',
    'ACL',
    'RoleMapping',
    'ValidUser',
    'Role',
    'Account',
    'answers',
    'Post',
    'coil',
    'words',
    'Questions'
  ];
  try {
    if (process.env.NODE_ENV === 'production') {
      await ds.autoupdate(Tables);
      const userCount = await ValidUser.count();
      if (userCount === 0) {
        console.log("Initialize Start");
        // 許可ユーザー追加
        let users = await ValidUser.create([
          {
            email: 'ht14a022@oecu.jp',
            role: 'student'
          },
          {
            email: 'ht14a034@oecu.jp',
            role: 'admin'
          }
        ]);

        // 問題を投入
        let json = await JSON.parse(fs.readFileSync('./json/wordsdata.json'));
        let coilsdata = await JSON.parse(fs.readFileSync('./json/question.json'));
        let questions = [];
        console.log(json);

        await words.create(json);
        for (let i = 0; i < json.length; i++) {
          let word = {
            en: [],
            ja: "",
            input: [],
            ans: [],
            example: "",
            judge: ""
          };

          word.example = await json[i].eng;
          word.ja = await json[i].jpn;
          let str = word.example;
          word.ans[0] = await str[0];
          for (let j = 0; j < str.length; j++) {
            word.en.push(str[j]);
          }

          questions.push(word);

        }
        await Questions.create(questions);
        await Coils.create(coilsdata);
      }
    } else {
      await ds.automigrate(Tables);
      const userCount = await ValidUser.count();
      if (userCount === 0) {
        console.log("Initialize Start");
        // 許可ユーザー追加
        let users = await ValidUser.create([
          {
            email: 'ht14a022@oecu.jp',
            role: 'student'
          },
          {
            email: 'ht14a034@oecu.jp',
            role: 'admin'
          }
        ]);

        // 問題を投入
        let json = await JSON.parse(fs.readFileSync('./json/wordsdata.json'));
        let coilsdata = await JSON.parse(fs.readFileSync('./json/question.json'));
        let questions = [];
        console.log(json);

        await words.create(json);
        for (let i = 0; i < json.length; i++) {
          let word = {
            en: [],
            ja: "",
            input: [],
            ans: [],
            example: "",
            judge: ""
          };

          word.example = await json[i].eng;
          word.ja = await json[i].jpn;
          let str = word.example;
          word.ans[0] = await str[0];
          for (let j = 0; j < str.length; j++) {
            word.en.push(str[j]);
          }

          questions.push(word);

        }
        await Questions.create(questions);
        await Coils.create(coilsdata);
      }

    }
    console.log('Success!');
  } catch (error) {
    console.log('Error: ' + error);
  }
};