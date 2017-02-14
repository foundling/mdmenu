function templateFunctions({ listType }) {

    if (!listType) throw new Error('A valid HTML list tag is a required parameter.'); 

    const _tplFns = {

        buildChild: function(title, headingSize, distance) {

            return `<${ listType }>
            <li>
            <h${ headingSize }> ${ title } </h${ headingSize }>
            `;

        },

        buildSibling: function (title, headingSize, distance) {

            return `</li>
            <li>
            <h${ headingSize }>${ title }</h${ headingSize }>
            `;

        },

        buildAncestor: function(title, headingSize, distance) {

            // new node is <li><h3>title</h3>
            const output = [];

            // closing: <distance> number of </li></ul> closings, plus another </li>
            const closingMarkup = _tplFns.closeMenu(Math.abs(distance)) + `\n</li>\n`;
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
