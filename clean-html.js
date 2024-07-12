const fs = require('fs');
const url = require('url');
const { JSDOM } = require('jsdom');

// Read command-line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
    console.error('Usage: node clean-html.js <inputHtmlPath> <attribute1> <attribute2> ...');
    process.exit(1);
}

// First argument is the HTML file path
const inputHtmlPath = args[0];

// Remaining arguments are attributes to remove
const attributesToRemove = args.slice(1);

// Read input HTML file
const htmlContent = fs.readFileSync(inputHtmlPath, 'utf8');

// Create a virtual DOM with JSDOM
const dom = new JSDOM(htmlContent);

// Remove specified attributes from all elements
const allElements = dom.window.document.getElementsByTagName("*");
for (let i = 0; i < allElements.length; i++) {
    for (let attribute of attributesToRemove) {
        allElements[i].removeAttribute(attribute);
    }
}

// Get the cleaned HTML
const cleanedHTML = dom.serialize();

// Write cleaned HTML to a file
const cleanedHtmlFilePath = 'cleaned.html';
fs.writeFileSync(cleanedHtmlFilePath, cleanedHTML, 'utf8');

console.log(`Cleaned document saved to ${cleanedHtmlFilePath}`);
