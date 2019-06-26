const puppeteer = require('puppeteer');

let browser, page;
// test('Adds two numbers', () => {
//     const sum = 1 + 2;
//     expect(sum).toEqual(3);
// })

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();
    await page.goto('localhost:3000');
})

afterEach(async () => {
    //await browser.close();
})

//console.log("sdf")
test('the header has the correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
})

test('clicking login starts oauth flow', async () => {
    await page.click('.right a');

    const url = await page.url();

    console.log(url)
    expect(url).toMatch(/accounts\.google\.com/);
})

test.only('When signed in, shows logout button', async () => {
    const id ='5d03cd041c3fc71292a88ce3'; //from my MongoDB

    const Buffer = require('safe-buffer').Buffer;
    const sessionObject = {
        passport: {
            user: id
        }
    }
    const sessionString = Buffer.from(
        JSON.stringify(sessionObject)
    ).toString('base64');

    const Keygrip = require('keygrip');
    const keys = require('../config/keys');
    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign('session=' + sessionString);

    await page.setCookie({name: "session", value: sessionString})
    await page.setCookie({name: "session.sig", value: sig})
    console.log(sessionString, sig);
    await page.goto('localhost:3000');
})