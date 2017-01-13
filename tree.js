const Tree = function(data) {

    const _tree = { children: [], data: null };
    const _findParent = (node, distance) => {

        while (distance > 0) {
            node = node.parent;
            --distance;
        }

        return node;

    };  
    const _createChild = (data, parent) => {
        return {
            data: data,
            children: []
        };
    };
    const buildTree = () => {

        if (!data.length) return _tree;

        _tree.root.push(currentNode);
        let currentNode = _createChild(data[0]);

        for (let cur = 1, prev = 0, max = data.length; cur < max; ++cur, ++prev) {
            const diff = data[ cur ].tag.length - data[ prev ].tag.length;
            const currentNode = _createChild( data[cur] );
            if (diff > 0) currentNode.children.push(newNode);
            if (diff === 0) _findParent(currentNode, diff).children.push(newNode);
            if (diff < 0) _findParent(currentNode, diff + 1).children.push(newNode);
        }

    };

    const toDom = () => JSON.stringify(_tree, undefined, 4);

    return {

        buildTree,
        toDom

    };

};

module.exports = exports = Tree;
