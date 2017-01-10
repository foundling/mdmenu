const Tree = function() {

    const data = [];
    const _tree = () => {  
        root: []
    };
    const buildTree = () => _tree;

    const findParent = (tag) => {};  
    const addChild = (child) => {};
    const createNode = () => {};
    const collect = (datum) => data.push(datum);
    const toDom = function() {
        return JSON.stringify(_tree, undefined, 4);
    };

};

module.exports = exports = Tree;
