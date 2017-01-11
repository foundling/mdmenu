/*
 * mdmenu builds an HTML menu from a markdown file. 
 */

const matchesLongest = (patterns) => (text) => {

    let rv = false;
    for (let i = 0; i < patterns.length; ++i) {
        if ( text.startsWith(patterns[i]) ) {
            rv = true;
            break;
        }
    } 
    return rv;

};

const tagToTitle = (line) => {

    const chars = line.split('');
    const splitPoint = line.indexOf(' ');
    const tag = chars.slice(0, splitPoint).join('');
    const title = chars.slice(splitPoint + 1).join('');

    return { tag, title };

};
const isLengthy = (x) => x.length;

const fs = require('fs');
const mdfile = fs.readFileSync('./test/document.md', 'utf8');
const Tree = require(__dirname + '/tree');

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
console.log(tree.toDom());
