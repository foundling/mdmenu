/* mdmenu builds an HTML menu from a markdown file. */

const fs = require('fs');
const mdfile = fs.readFileSync('./test/document.md', 'utf8');

const {

    isLengthy,
    matchesLongest,
    tagToTitle

} = require('./lib/util');

const Tree = require('./lib/tree');

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
tree.toDom();
