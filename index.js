/* mdmenu builds an HTML menu from a markdown file. */

// conforms to the HTML5 spec: https://www.w3.org/wiki/HTML_lists#Nesting_lists

const fs = require('fs');
const mdfile = fs.readFileSync('./test/document.md', 'utf8');
const Tree = require('./lib/tree');

const {

    matchesLongest,
    tagToTitle,
    isLengthy,
    toTrimmed

} = require('./lib/util');

const {

    buildChild,
    buildSibling,
    buildAncestor,
    closeMenu

} = require('./lib/templateFunctions').init({

    listType: process.argv[2] || 'ul'  

});

const headings = [
    '######',
    '#####',
    '####',
    '###',
    '##',
    '#'
];

const headingLines = mdfile
    .split('\n')
    .filter(isLengthy)
    .map(toTrimmed)
    .filter(matchesLongest(headings));

const data = headingLines.map(tagToTitle);
const tree = new Tree(data);

const tagsSeen = [];
let output = '';
let lastTag; 
let currentIndent = 0;

const domStringBuilder = function({ indentChar }) {


    return function buildDomString({ tag, title, direction, options }) {

        const tagLength = tag.length;

        // child
        if (direction > 0) {

            output += buildChild(title, tagLength, direction, currentIndent);  
            ++currentIndent;

        }

        // sibling
        if (direction === 0) {
         
            output += buildSibling(title, tagLength, direction, currentIndent);       
        }

        // ancestor
        if (direction < 0 ) {

            output += buildAncestor(title, tagLength, direction, currentIndent);
            currentIndent = currentIndent - direction;
                
        }

        output += indentChar.repeat(currentIndent); 

        tagsSeen.push(tag);
        lastTag = tag;

    };
};

tree.buildTree();
tree.processData( domStringBuilder({ indentChar: '\t' }) );

const shortestTagSeen = Math.min(...tagsSeen.map(tag => tag.length));
const lastTagLength = lastTag.length;
const closingDistance = lastTag.length - shortestTagSeen;

output += closeMenu(closingDistance + 1);
process.stdout.write(output);
