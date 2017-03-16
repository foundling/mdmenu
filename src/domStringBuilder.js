
const DomStringBuilder = function({ indentChar, tplFns }) {

    const {

        buildChild,
        buildSibling,
        buildAncestor,
        closeMenu

    } = tplFns;

    const state = {

        currentIndent: 0,
        output: '',
        tagsSeen: [],
        lastTag: ''

    };

    return function buildDomString({ tag, title, direction }) {

        const tagLength = tag.length;

        // child
        if (direction > 0) {
            state.output += buildChild(title, tagLength, direction, state.currentIndent);  
            ++state.currentIndent;
        }

        // sibling
        if (direction === 0) {
            state.output += buildSibling(title, tagLength, direction, state.currentIndent);       
        }

        // ancestor
        if (direction < 0 ) {
            state.output += buildAncestor(title, tagLength, direction, state.currentIndent);
            state.currentIndent = state.currentIndent - direction;
        }

        state.output += indentChar.repeat(state.currentIndent); 

        state.tagsSeen.push(tag);
        state.lastTag = tag;

        return state;

    };
};

module.exports = DomStringBuilder;
