// ==UserScript==
// @name         stxt
// @namespace    https://vulonkaaz.zip/
// @version      0.2
// @description  render stxt pages
// @author       Vulonkaaz
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=0.1
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (document.contentType === "text/stxt") {
        //set those to false to disable the extensions you want
        const extTitle = true;
        const extBg = true;
        const extFg = true;


        const pre = document.querySelector("pre");
        let txt = pre.innerHTML;
        var extensions = [];
        var lines = txt.split("\n");
        for (let line of lines){
            if (!line.startsWith("++")){break;}
            if (line.startsWith("++title") && extTitle) {
                document.title = line.split("=")[1];
            }
            if (line.startsWith("++bg") && extBg) {
                document.body.style.backgroundColor = line.split("=")[1];
            }
            if (line.startsWith("++fg") && extFg) {
                document.body.style.color = line.split("=")[1];
            }
        }
        const urlRegex = /(?:\w+:\/\/|(?<!\w)\.{0,2}\/\w)[^\s)\]}"']+/g;
        pre.innerHTML= txt.replace(urlRegex, function(url) {
            return `<a href="${url}" target="_blank">${url}</a>`;
        });
    }
})();
