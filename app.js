const puppeteer = require("puppeteer");

//const depts = ["APSC", "ENGR"];
const depts = ["APSC"];

var classes = [];

depts.forEach((dept) => {
  var url = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=${dept}`;
  console.log(url);

  var table = scrapeDepartment(url);
  console.log(table);
});

async function scrapeDepartment(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x('//*[@id="mainTable"]/tbody');
  const txt = await el.getProperty("textContent");
  const srcRawText = await txt.jsonValue();

  browser.close();

  return srcRawText;
}
