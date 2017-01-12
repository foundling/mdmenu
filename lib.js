/*
 * Predicates and Transformations
 */

const matchesLongest = (patterns) => (text) => {

    let rv = false;
    for (let i = 0; i < patterns.length; ++i) {
        if ( text.startsWith(patterns[i]) ) {
            rv = true;
            break;
        }
    } 
    return rv;

};

const tagToTitle = (line) => {

    const chars = line.split('');
    const splitPoint = line.indexOf(' ');
    const tag = chars.slice(0, splitPoint).join('');
    const title = chars.slice(splitPoint + 1).join('');

    return { tag, title };

};
const isLengthy = (x) => x.length;

module.exports = exports = {
    matchesLongest,
    tagToTitle,
    isLengthy
};
