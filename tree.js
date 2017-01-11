const Tree = function(data) {

    const _tree = { root: null };

    const buildTree = () => {

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
                parent: parent,
                children: []
            };
        };

        if (!data.length) return _tree;

        _tree.root = [];
        let currentNode = _tree.root;
        currentNode.push(data);       

        for (let cur = 1, prev = 0, max = data.length; cur < max; ++cur, ++prev) {

            let diff = data[cur].tag.length - data[prev].tag.length;
            let currentNode;

            if (diff > 0) {
                // add child
                newNode = _createChild( data[cur] );
                currentNode.children.push(newNode);
            }
            if (diff === 0) {
                // add sibling
                currentNode = _findParent(currentNode, diff);
                newNode = _createChild( data[cur] );
                currentNode.children.push(newNode);
            }
            if (diff < 0) {
                // add to array that parent is in
                currentNode = _findParent(currentNode, diff + 1);
                newNode = _createChild( data[cur] );
                currentNode.children.push(newNode);
            }

        }

    };

    const toDom = () => JSON.stringify(_tree, undefined, 4);

    return {

        buildTree,
        toDom

    };

};

module.exports = exports = Tree;
