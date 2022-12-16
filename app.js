const cheerio = require('cheerio');
var fs = require('fs'), path = require('path'), filePath = path.join(__dirname, 'input.txt');

var fileContent = fs.readFileSync(filePath,{ encoding: 'utf8' });
const $ = cheerio.load(fileContent);
let forms = $('form');

Object.keys(forms).forEach((key, i) => {
  if (key.match(/\d{1,2}/)) {
    let form = forms[key];
    let questionNo = $(form['children'][0]).text();
    let questionText = ''
    let questionTextParts = form['children'][2];
    questionTextParts.children.forEach(child => {
      if (child.name === 'p') {
        questionText += $(child).text().replace('\n', '') + '\n';
      }
      if (child.type === 'text') {
        questionText += child.data.replace('\n', '');
      }
    })
    let q = '';
    let questionTemplate = `\n${questionNo} ${questionText}`;
    q += questionTemplate;
    let answers = form['children'][3]['children'];
    answers.forEach(ans => {
      let ansText = $(ans).text().replace('\n', '');
      let ansType = ans['children'][0]['children'][1].name;
      let typeRadio = 'O';
      let typeCheckbox = '□';
      let type = '';
      if (ansType === 'span') {
        type = typeRadio;
      } else {
        type = typeCheckbox;
      }
      let ansTemplate = `${type} ${ansText.replace('(Correct)', '').replace('(Incorrect)', '')}\n`;
      q += ansTemplate;
    })
    fs.appendFileSync('output.txt', q);
  }
}) 