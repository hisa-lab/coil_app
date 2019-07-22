'use strict';
const program = require("commander");
const fs = require("fs");
let filePath = "coils.json";
let data = JSON.parse(fs.readFileSync(filePath, "utf8"));

// for (const ite of data) {
//     console.log(ite.keyword);
// }
console.log(data.length);
//重複削除
let cleanList = data.filter(function (v1, i1, a1) {
    return (a1.findIndex(function (v2) {
        return (v1.keyword === v2.keyword);
    }) === i1);
});
console.log(cleanList.length);
fs.writeFileSync('format.json', JSON.stringify(cleanList, null, '    '));
