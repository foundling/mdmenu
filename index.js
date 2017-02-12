/* mdmenu builds an HTML menu from a markdown file. */

// https://www.w3.org/wiki/HTML_lists#Nesting_lists

const fs = require('fs');
const mdfile = fs.readFileSync('./test/document.md', 'utf8');

const {

    isLengthy,
    matchesLongest,
    tagToTitle

} = require('./lib/util');

const Tree = require('./lib/tree');

const listTypes = ['ul', 'ol', 'dl'];
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

let stringOutput = '';

const buildDomString = function({ tag, title, isLeaf }) { 


    console.log(isLeaf);
    let count = tag.length; 
    let openTag = `<h${ count }>`;
    let closeTag = `</h${ count }>`;
    let heading = `${openTag}${ title }${ closeTag }`; 

    stringOutput = stringOutput + heading + '\n';

}; 

tree.buildTree();
tree.processData(buildDomString);
