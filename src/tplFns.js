function templateFunctions({ listType }) {

    const _tplFns = {

        buildChild: function(title, headingSize, distance, currentIndent) {
            const indent = '\t'.repeat(currentIndent);

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

            // NOTE: don't use .closeMenu, repeat it literally. easier to read. 
 
            // new node is <li><h3>title</h3>
            const output = [];

            // closing: <distance> number of </li></ul> closings, plus another </li>
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

module.exports = exports = {

    init: templateFunctions

};
