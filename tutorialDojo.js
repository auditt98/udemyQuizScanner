const cheerio = require("cheerio");
var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "input.txt");

var fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
const $ = cheerio.load(fileContent);
let listItems = $(".wpProQuiz_listItem");
let questionTexts = $(".wpProQuiz_question_text");
let questionLists = $(".wpProQuiz_questionList");
let answers = $(".wpProQuiz_response");
let questionNo = [];
//fill question no from 1 to 65
for (let i = 1; i <= 65; i++) {
  questionNo.push(i);
}
let questions = [];
Object.keys(questionTexts).forEach((key) => {
  let element = questionTexts[key];
  let children = element.children;
  console.log("element", element);
  if (children && Array.isArray(children)) {
    let data = ''
    children.forEach((child) => {

      if (child.type === "text") {
        data += child.data;
      } else {
        data += $(element).text()
      }

    });
    questions.push(data);
  }
});
console.log("questions", questions);

// fs.appendFileSync('output.txt', q);
