const puppeteer = require("puppeteer")
// const fs = require("fs/promises")

const depts = ['APSC', 'ENGR'];
depts.forEach((dept) => {
    let url = `https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=${dept}`;
    let courseData = start(url);
    console.log(courseData);
});
async function start(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const rows = await page.$$('#mainTable > tbody > tr');
  let courseArray = [];
    console.log(rows);

  for (let i = 0; i < rows.length; i++){
    const row = rows[i];

    const number = await row.evaluate('td:nth-of-type(1) > a', element => element.textContent);
    const link = await row.evaluate('td:nth-of-type(1) > a', element => element.href);
    const name = await row.evaluate('td:nth-of-type(2)', element => element.textContent);
    let course = {
        number: number,
        link: link,
        title: name
    };
    courseArray.push(course);
  }

//   await fs.writeFile("names.txt", courseArray.join("\r\n"));
  
  await browser.close();
  return courseArray;
}

