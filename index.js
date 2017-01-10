/*
 * mdmenu builds an HTML menu from a markdown file. 
 */

let fs = require('fs');

let tags = ['#','##','###','####','#####','######'];
let depth = 0;

let tagIsParsed = (state) => {

    let rv = false;

    if (
        state.last === '#' && current === ' ' || 
        state.current === '#' && state.next === null
    ) {
        rv = true;
    }

    return rv;

};
let parseHeader = (line) => {
    return line;
};

let updateState = (output, input, index, end) => {

    // check for first hash
    if (output === '' && input === '#') {
        output.tagStartIndex = index;
    }

    // check if we're at the end of hashes
    if (input === '#') {
        output.tag = output.tag + input 
        output.nextChar = end ? null : array[index + 1];
        output.tagStartIndex === null;
    }

};

let parseMdToTree = (output, input, index, array) => {

    let isLastIndex = index === array.length - 1;

    output = updateState(output, input, index, isLastIndex) 
    if (tagIsParsed(output)) {
        output.tree.collect(parseHeader());   
    }

    return isLastIndex ? output.tree.buildTree() : output;

};

let md = fs.readFileSync(__dirname + '/test.md', 'utf8').toString().split(''); 

let Tree = function() {

    let data = [];
    let _tree = () => {  
        root: []
    };
    let buildTree = () => _tree;

    let findParent = (tag) => {};  
    let addChild = (child) => {};
    let createNode = () => {};
    let collect = (datum) => data.push(datum);
    let toDom = function() {
        return JSON.stringify(_tree, undefined, 4);
    };


};

let stateMachine = {
    tag: '',
    tagStartIndex: null,
    tree: new Tree()
};

let domTree = md.split().reduce(md, parseMdToTree, stateMachine);


/*
## PARSING

depth
find_next_tag = while ++c !== 
calculate_depth
get_associated_title

## REPRESENT

tree
root = []
create_child -> { data: x , children: [y] }
find_parent

## BUILD DOM FRAGMENT


# Title A
## Subtitle A
### Sub-subtitle A
# Title B
## Subtitle B
#Title C

*/
