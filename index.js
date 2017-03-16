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

const options = {

    indentChar: '\t',
    listType: 'ul'

};

const tplFns = require('./src/tplFns').init({ 
    listType: process.argv[2] || options.listType 
});

function main() {

    const headingLines = parseHeadings(mdContent);
    const tree = Tree({ data: headingLines.map(tagToTitle) });
    const domStringBuilder = DomStringBuilder({ indentChar: options.indentChar, tplFns });

    tree.buildTree();

    let outputData = tree.processData(domStringBuilder);

    const shortestTagSeen = Math.min(...outputData.tagsSeen.map(tag => tag.length));
    const lastTagLength = outputData.lastTag.length;
    const closingDistance = outputData.lastTag.length - shortestTagSeen;

    outputData.output += tplFns.closeMenu(closingDistance + 1);
    process.stdout.write(outputData.output);

}

main();
