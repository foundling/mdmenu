// mdmenu builds an HTML menu from a markdown file.
// https://www.w3.org/wiki/HTML_lists#Nesting_lists

const fs = require('fs');
const Tree = require('./src/tree');
const DomStringBuilder = require('./src/domStringBuilder');
const mdContent = fs.readFileSync('./test/document.md', 'utf8');

const { 

    parseHeadings, 
    tagToTitle 

} = require('./src/util');


function main() {

    const headingLines = parseHeadings(mdContent);
    const tree = Tree({ data: headingLines.map(tagToTitle) });
    const buildDomString = DomStringBuilder({ indentChar:'\t', listType:'ul' });

    tree.buildTree();

    let output = tree.processData(buildDomString);
    process.stdout.write(output + '\n');

}

main();
