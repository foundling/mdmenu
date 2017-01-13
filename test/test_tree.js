const test = require('tape');
const Tree = require(__dirname + '/../tree');

const data = [];
const tree = new Tree(data); 
test('a tree object should have two methods', (t) => {
    t.equals(typeof tree.toDom, 'function');
    t.end();
});
