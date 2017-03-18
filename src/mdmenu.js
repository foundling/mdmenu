// mdmenu builds an HTML menu from a markdown file.
// https://www.w3.org/wiki/HTML_lists#Nesting_lists

//var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

const fs = require('fs');
const path = require('path');
const Tree = require('./tree');
const DomStringBuilder = require('./domStringBuilder');

const { 

    parseHeadings, 
    tagToTitle, 
    validateArgs,
    usage

} = require('./util');


module.exports = function main() {

    const filepath = validateArgs(process.argv);
    const mdContent = fs.readFileSync(filepath, 'utf8');
    const headingLines = parseHeadings(mdContent);
    const tree = Tree({ data: headingLines.map(tagToTitle) });
    const buildDomString = DomStringBuilder({ indentChar:'\t', listType:'ul' });

    tree.buildTree();

    let output = tree.processData(buildDomString);
    process.stdout.write(output + '\n');

};
