const cheerio = require("cheerio");
const axios = require("axios");

const depts = ["APSC"];
// const depts = ["APSC", "ENGR"];

const sections = [".section1"];
// const sections = [".section1", ".section2"];

var gCourses = [];

async function main() {
  await callApisSequential();

  console.log("hi");
  console.log(gCourses);

  // Uncomment to run all the API calls in parallel. See comments in function
  //callApisParellel();
}

async function callApisSequential() {
  // Method 1: Await each promise sequentially
  // This will call each API one by one, once one returns the next is called
  // This is slow if there are 10+ API calls. But it is ok if you don't care about time

  for (const dept of depts) {
    const courses = await getCoursesForDept(dept);
    //console.log(courses);
    gCourses.push(...courses);
  }
}

async function callApisParellel() {
  // Method 2: Add all the promises to one array,
  // then call them all at the same time. This will run them in PARALLEL.
  // Note: more than 10 API calls in parallel may overload your network,
  // and you will look like a bot and may get blacklisted.

  const apiPromises = [];

  for (const dept of depts) {
    // Queue up the API call
    // This is NOT going to run immediately.
    // A promise is only called when it is awaited
    apiPromises.push(getCoursesForDept(dept));
  }

  // Call all APIs at the same time in parallel!
  // The Promise.all adds all the promises together,
  // then await calls them all at the same time.
  const allCoursesCombined = await Promise.all(apiPromises);

  console.log(allCoursesCombined);
}

// Returns list of courses scraped from the html of a course schedule page
function parseCourseScheduleHTML(html, dept) {
  // will return courses after parse
  const courses = [];

  // load parser
  const parser = cheerio.load(html);

  // loop thru sections, parsing each
  for (const section of sections) {
    parser(section, html).each((_i, elem) => {
      const text = parser(elem).text();
      const courseInfo = parser(elem).find("a").text();
      const courseNumber = courseInfo.replace(dept + " ", "");
      const courseName = text.replace(courseInfo, "");

      // add course to return
      courses.push({
        dept,
        courseNumber,
        courseName,
      });
    });
  }

  return courses;
}

// Returns promise that resolves to list of courses for the department
// On error, rejects with error from API
async function getCoursesForDept(dept) {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        `https://courses.students.ubc.ca/cs/courseschedule?tname=subj-department&campuscd=UBCO&dept=${dept}`
      )
      .then((response) => {
        const html = response.data;
        const courses = parseCourseScheduleHTML(html, dept);

        // Promise returns the courses list
        resolve(courses);
      })
      .catch((err) => reject(err.json()));
  });
}

// run main
main();
