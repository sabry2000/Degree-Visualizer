const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=APSC");

  const rows = await page.$$('#mainTable tbody tr');
  let courseNumber = [];
  let courseLink = [];
  let courseName = [];

  for (let i = 0; i < rows.length; i++){
    const row = rows[i];

    const number = await row.$eval('td:nth-of-type(1) a', element => element.textContent);
    const link = await row.$eval('td:nth-of-type(1) a', element => element.href);
    const name = await row.$eval('td:nth-of-type(2)', element => element.textContent);
    courseNumber.push(number);
    courseLink.push(link);
    courseName.push(name);
  }

  await fs.writeFile("courses.txt", courseNumber.join("\r\n"));
  await fs.writeFile("courses.txt", courseLink.join("\r\n"));
  await fs.writeFile("courses.txt", courseName.join("\r\n"));
  

  await browser.close();

}

start();
