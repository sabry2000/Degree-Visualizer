const puppeteer = require('puppeteer');

async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-department&dept=APSC');
    
}

start();