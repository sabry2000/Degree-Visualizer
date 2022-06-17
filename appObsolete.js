const cheerio = require("cheerio");
const axios = require("axios");
const request = require("request");

//const depts = ["APSC", "ENGR"];
const depts = ["APSC"];

//const sections = [".section1", ".section2"];
const sections = [".section1"];

const courses = new Array();

depts.forEach(async (dept) => {
  console.log("y");
  return await new Promise((resolve, reject) => {
    request(
      `https://courses.students.ubc.ca/cs/courseschedule?tname=subj-department&campuscd=UBCO&dept=${dept}`,
      (error, res, body) => {
        console.log("w");
        const $ = cheerio.load(body);

        sections.forEach((section) => {
          $(section, body).each((_i, elem) => {
            cpp;
            const courseInfo = $(elem).find("a").text();
            const courseNumber = courseInfo.replace(dept + " ", "");
            const courseName = text.replace(courseInfo, "");

            courses.push({
              dept,
              courseNumber,
              courseName,
            });
          });
        });
      }
    );
  });
});

function resolve() {}
console.log(courses);
// var x = depts.forEach(async (dept) => {
//   const url = `https://courses.students.ubc.ca/cs/courseschedule?tname=subj-department&campuscd=UBCO&dept=${dept}`;
//   return axios(url)
//     .then((response) => {
//       const html = response.data;
//       const $ = cheerio.load(html);

//       sections.forEach((section) => {
//         $(section, html).each((_i, elem) => {
//           const text = $(elem).text();
//           const courseInfo = $(elem).find("a").text();
//           const courseNumber = courseInfo.replace(dept + " ", "");
//           const courseName = text.replace(courseInfo, "");

//           courses.push({
//             dept,
//             courseNumber,
//             courseName,
//           });
//         });
//       });
//     })
//     .catch((err) => console.log(err));
//   //.then(() => console.log(courses));
// });

courses.forEach((course) => {
  console.log("x");
  const courseNumber = course.courseNumber;
  const dept = course.dept;
  const url = `https://courses.students.ubc.ca/cs/courseschedule?tname=subj-course&course=${courseNumber}&campuscd=UBCO&dept=${dept}&pname=subjarea`;
  console.log(url);

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
});
