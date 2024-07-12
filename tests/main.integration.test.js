const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

describe("Chat scroll integration tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      dumpio: true, // Enable verbose logging
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test("sets tabindex on target element", async () => {
    await page.setContent('<div class="flex flex-col text-sm md:pb-9"></div>');

    const scriptContent = fs.readFileSync(
      path.resolve(__dirname, "../src/main.js"),
      "utf8",
    );
    await page.addScriptTag({ content: scriptContent });

    await page.evaluate(() => {
      const newDiv = document.createElement("div");
      newDiv.className = "flex flex-col text-sm md:pb-9";
      document.body.appendChild(newDiv);
      console.log("New div appended:", newDiv.outerHTML);
    });

    await page.waitForTimeout(1000);

    // await page.waitForSelector(
    //   'div.flex.flex-col.text-sm.md\\:pb-9[tabindex="1"]',
    // );

    const htmlContent = await page.evaluate(
      () => document.documentElement.innerHTML,
    );
    console.log("HTML content:", htmlContent);

    const hasTabindex = await page.evaluate(() => {
      const elem = document.querySelector(
        "div.flex.flex-col.text-sm.md\\:pb-9",
      );
      return elem && elem.getAttribute("tabindex") == "1";
    });

    expect(hasTabindex).toBe(true);
  });
});
