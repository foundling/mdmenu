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

let depth = 1; 

const buildChild = function(title, headingSize, levels) {
    // insert new list with an opening li containing a heading tag

    const indent = ' '.repeat(depth + levels)
    depth = indent + depth;

    return `
    ${ indent.repeat(levels * 1) }<ul>
    ${ indent.repeat(levels * 1) }<li>
    ${ indent.repeat(levels * 2) }<h${ headingSize }> ${ title } </h${ headingSize }>`;
}

const buildSibling = function(title, headingSize, levels) {
    // close previous list and add a new open list with title in it.

    return `
    </li>
    <li>
        <h${ headingSize }>title</h${ headingSize }>`;

};

const buildAncestor = function(title, headingSize, levels) {

    const output = [];
    const ancestor = `
    <li>
        <h${ headingSize }>${ title }</h${ headingSize }>`;

    output.push(closeMenu(levels));
    output.push(ancestor);

    return output.join('\n');

};

const closeMenu = function(levels) {

    const closingOutput = [];

    while (levels > 0) {
        
        let tpl = `\
    </li>
</ul>`;
        closingOutput.push(tpl);
        --levels;    

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

console.log(output);
console.log(previousDirection);
