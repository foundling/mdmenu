/*
 * mdmenu builds an HTML menu from a markdown file. 
 */

const fs = require('fs');
const Tree = require(__dirname + '/tree');
const tags = ['#','##','###','####','#####','######'];
const stateMachine = {
    tag: '',
    tagStartIndex: null,
    tree: new Tree()
};

const tagIsParsed = (state) => {

    let rv = false;

    if (
        state.last === '#' && current === ' ' || 
        state.current === '#' && state.next === null
    ) {
        rv = true;
    }

    return rv;

};

const parseHeader = (line) => line;

const updateState = (output, input, index, end) => {

    // check for first hash
    if (output === '' && input === '#') {
        output.tagStartIndex = index;
    }

    // check if we're at the end of hashes
    if (input === '#') {
        output.tag = output.tag + input; 
        output.nextChar = end ? null : array[index + 1];
        output.tagStartIndex = null;
    }

};

const parseMdToTree = (output, input, index, array) => {

    const isLastIndex = index === array.length - 1;

    output = updateState(output, input, index, isLastIndex); 
    if (tagIsParsed(output)) {
        output.tree.collect(parseHeader());   
    }

    return isLastIndex ? output.tree.buildTree() : output;

};


const md = fs.readFileSync(__dirname + '/test.md', 'utf8').toString().split(''); 
const domTree = md.reduce(parseMdToTree, stateMachine);
