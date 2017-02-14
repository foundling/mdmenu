/* mdmenu builds an HTML menu from a markdown file. */
// https://www.w3.org/wiki/HTML_lists#Nesting_lists

const {

    isLengthy,
    matchesLongest,
    tagToTitle

} = require('./lib/util');
const fs = require('fs');
const mdfile = fs.readFileSync('./test/document.md', 'utf8');
//const mdfile = fs.readFileSync('./test/real_doc.md', 'utf8');
//const mdfile = fs.readFileSync('./test/document_simple2.md', 'utf8');

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


const buildChild = function(title, headingSize, distance) {
    return `<ul>
<li>
<h${ headingSize }> ${ title } </h${ headingSize }>

`;

}

const buildSibling = function(title, headingSize, distance) {
    // close previous list and add a new open list with title in it.

    return `</li>
<li>
<h${ headingSize }>${ title }</h${ headingSize }>
`;

};

const buildAncestor = function(title, headingSize, distance) {

    // new node is <li><h3>title</h3>
 
    const output = [];

    // closing: <distance> number of </li></ul> closings, plus another </li>
    const closingMarkup = closeMenu(Math.abs(distance)) + `\n</li>\n`;
    const ancestor = `<li>\n<h${ headingSize }>${ title }</h${ headingSize }>\n`;

    output.push(closingMarkup);
    output.push(ancestor);

    return output.join('\n');

};

const closeMenu = function(distance) {

    const closingOutput = [];

    while (distance > 0) {
        
        let tpl = `
    </li>
</ul>
`;
        closingOutput.push(tpl);
        --distance;    

    }

    return closingOutput.join('\n');

};




let output = '';
let previousDirection; 

const buildDomString = function({ tag, title, direction }) { 

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

    previousDirection = direction;

}; 



tree.buildTree();
tree.processData(buildDomString);
output += closeMenu(Math.abs(previousDirection) + 2);
console.log(output);
