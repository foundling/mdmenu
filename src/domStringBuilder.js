function DomStringBuilder({ indentChar, listType }) {

    const {

        buildChild,
        buildSibling,
        buildAncestor,
        closeMenu

    } = templateFunctions({ indentChar, listType });

    const state = {

        currentIndent: 0,
        output: '',
        tagsSeen: [],
        lastTag: ''

    };

    return function buildDomString({ tag, title, direction, done }) {

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

        if (done) {

            const shortestTagSeen = Math.min(...state.tagsSeen.map(tag => tag.length));
            const lastTagLength = state.lastTag.length;
            const closingDistance = state.lastTag.length - shortestTagSeen;
            state.output += closeMenu(closingDistance + 1);

        }

        return state.output;

    };
};

function templateFunctions({ indentChar, listType }) {

    const _tplFns = {

        buildChild: function(title, headingSize, distance, currentIndent) {
            const indent = indentChar.repeat(currentIndent);

            return `
                ${indent}<${ listType }>
                ${indent}    <li>
                ${indent}        <h${ headingSize }> ${ title } </h${ headingSize }>`;

        },

        buildSibling: function (title, headingSize, distance, indent) {

            return `
                ${indent}</li>
                ${indent}<li>
                ${indent}   <h${ headingSize }>${ title }</h${ headingSize }>`;

        },

        buildAncestor: function(title, headingSize, distance, indent) {

 
            const output = [];
            const closingMarkup = _tplFns.closeMenu(Math.abs(distance)); + `\n</li>\n`;
            const ancestor = `<li>\n<h${ headingSize }>${ title }</h${ headingSize }>\n`;
            output.push(closingMarkup);
            output.push(ancestor);
            return output.join('\n');

        },

        closeMenu: function(distance){

            const closingOutput = [];

            while (distance > 0) {
                
                let tpl = `
                </li>
                    </${listType}>
                                `;

                closingOutput.push(tpl);
                --distance;    

            }

            return closingOutput.join('\n');
        },
    };

    return _tplFns;

}



module.exports = DomStringBuilder;
