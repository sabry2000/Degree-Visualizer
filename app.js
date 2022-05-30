const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
//const express = require("express");
const axios = require("axios");
const { response } = require("express");

const PORT = 8000;
//const app = express();

//app.listen(PORT, () => console.log(`server running on port ${PORT}`));

const depts = ["APSC", "ENGR"];
//const depts = ["APSC"];

//const sections = [".section1", ".section2"];
const sections = [".section1"];

const courses = [];

depts.forEach((dept) => {
  var url = `https://courses.students.ubc.ca/cs/courseschedule?tname=subj-department&campuscd=UBCO&dept=${dept}`;
  console.log(url);

  axios(url)
    .then((response) => {
      const html = response.data;
      //console.log(html);

      const $ = cheerio.load(html);

      sections.forEach((section) => {
        $(section, html).each(function () {
          const text = $(this).text();
          const courseInfo = $(this).find("a").text();
          const courseNumber = courseInfo.replace(dept + " ", "");
          const courseName = text.replace(courseInfo, "");

          courses.push({
            dept,
            courseNumber,
            courseName,
          });
        });
      });

      console.log(courses);
    })
    .catch((err) => console.log(err));

  // var table = scrapeDepartment(url);
  // console.log(table);
});

console.log(courses);

  const [el] = await page.$x('//*[@id="mainTable"]/tbody');
  const txt = await el.getProperty('textContent')
  const srcRawText = await txt.jsonValue();

  axios(url)
    .then((response) => {
      const html = response.data;
      //console.log(html);

      const $ = cheerio.load(html);

      $(".content expand", html).each(function () {
        const text = $(this).text();
        const description = $(this).find("p").text();
        course.description = description;

        const table = $(this).find("td").text();

        console.log(description);
        console.log(table);
      });
    })
    .catch((err) => console.log(err));

// async function scrapeDepartment(url) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(url);

//   const [el] = await page.$x('//*[@id="mainTable"]/tbody');
//   const txt = await el.getProperty("textContent");
//   const srcRawText = await txt.jsonValue();

//   browser.close();

//   return srcRawText;
// }
