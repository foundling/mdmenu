const test = require('tape');
const Tree = require(__dirname + '/../tree');

const data = ['#','##','###'];
const tree = new Tree(data); 


test('Instantiation of Tree has two methods, toDom and buildTree', (t) => {

    t.equals(typeof tree.toDom, 'function');
    t.equals(typeof tree.buildTree, 'function');

    t.end();
});
