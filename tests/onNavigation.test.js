const { JSDOM } = require("jsdom");
const { onNavigation } = require("../src/main.js");

describe("onNavigation", () => {
  let dom;

  beforeEach(() => {
    // dom = new JSDOM(
    //   `<!DOCTYPE html><body><div class="flex flex-col text-sm md:pb-9"></div></body>`,
    //   { runScripts: "dangerously", resources: "usable" },
    // );
    // console.log(dom.window.document.documentElement.innerHTML);
    // document = dom.window.document;
    // window = dom.window;
    // global.document = dom.window.document;
    // global.window = dom.window;
    // global.omg = dom.window.document;
    // document = window.document;
    // Initialize the document with the desired HTML content
    // global.document.body.innerHTML = `<div class="flex flex-col text-sm md:pb-9"></div>`;

    // const dom = new JSDOM();
    dom = new JSDOM(
      `<!DOCTYPE html><body><div class="flex flex-col text-sm md:pb-9"></div></body>`,
      { runScripts: "dangerously", resources: "usable" },
    );
    delete global.document;
    delete global.window;
    global.document = dom.window.document;
    global.window = dom.window;
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
  });

  test("sets tabindex to 1 on the target element", () => {
    onNavigation();
    const elem = global.document.querySelector(
      "div.flex.flex-col.text-sm.md\\:pb-9",
    );
    expect(elem.getAttribute("tabindex")).toBe("1");
  });

  test("does nothing if the target element is not found", () => {
    global.document.querySelector(
      "div.flex.flex-col.text-sm.md\\:pb-9",
    ).className = "otherName";
    onNavigation();
    const elem = global.document.querySelector(
      "div.flex.flex-col.text-sm.md\\:pb-9",
    );
    expect(elem).toBeNull();
  });
});
