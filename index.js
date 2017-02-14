/* mdmenu builds an HTML menu from a markdown file. */
// conforms to the HTML5 spec: https://www.w3.org/wiki/HTML_lists#Nesting_lists

const fs = require('fs');
const mdfile = fs.readFileSync('./test/document.md', 'utf8');
const Tree = require('./lib/tree');

const {

    isLengthy,
    matchesLongest,
    tagToTitle

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
    .map(line => line.trim())
    .filter(matchesLongest(headings));

const data = headingLines.map(tagToTitle);
const tree = new Tree(data);

const tagsSeen = [];
let output = '';
let lastTag; 

const domStringBuilder = function({ indentChar }) {

    let indent = 0;

    return function buildDomString({ tag, title, direction, options }) {

        const tagLength = tag.length;

        // child
        if (direction > 0) {

            output += buildChild(title, tagLength, direction);  

        }

        // sibling
        if (direction === 0) {
         
            output += buildSibling(title, tagLength, direction);       
        }

        // ancestor
        if (direction < 0 ) {

            output += buildAncestor(title, tagLength, direction);
                
        }

        tagsSeen.push(tag);
        lastTag = tag;

    };
};

const options = {

    indentChar: '\t', 

};

tree.buildTree();
tree.processData( domStringBuilder(options) );

const shortestTagSeen = Math.min(...tagsSeen.map(tag => tag.length));
const lastTagLength = lastTag.length;
const closingDistance = lastTag.length - shortestTagSeen;

output += closeMenu(closingDistance + 1);
process.stdout.write(output);
