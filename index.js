/*
 * mdmenu builds an HTML menu from a markdown file. 
 */

const fs = require('fs');
const mdfile = fs.readFileSync('./test/document.md', 'utf8');
const Tree = require(__dirname + '/tree');
const {
    matchesLongest,
    tagToTitle,
    isLengthy
} = require(__dirname + '/lib');

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
tree.buildTree();

//console.log(tree.toDom());
