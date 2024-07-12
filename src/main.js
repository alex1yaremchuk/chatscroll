// ==UserScript==
// @name         Make ChatGPT scrollable with keyboard
// @namespace    http://tampermonkey.net/
// @version      2024-07-01
// @description  This app makes it scrollable by setting tabindex to outer div making it focusable
// @author       Alexander Yaremchuk & ChatGPT
// @match        https://chatgpt.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @license      MIT
// ==/UserScript==

function onNavigation() {
  console.log("============helllo===============");
  var elem = document.querySelector("div.flex.flex-col.text-sm.md\\:pb-9");
  console.log("!!!", elem);
  console.log("===", document.documentElement.innerHTML);
  if (elem) {
    elem.setAttribute("tabindex", "1");
  }
}

(function () {
  "use strict";
  if (
    typeof document !== "undefined" &&
    typeof MutationObserver !== "undefined"
  ) {
    const callback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          onNavigation();
          break;
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(document.body, { childList: true, subtree: true });
  }
})();

module.exports = { onNavigation };
