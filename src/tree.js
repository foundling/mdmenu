const Tree = function({ data }) {

    let _tree = _mkNode({ 

        data: null, 
        parent: null, 
        direction: null,
        children: [] 

    });

    let output = null;
    let nodesProcessed = 0;

    function _findAncestor(node, distance) {

        while (distance > 0) {
            node = node.parent;
            --distance;
        }

        return node;

    }  

    function _mkNode({ data, parent, children, direction }) {

        return {

            data: data,
            parent: parent,
            children: children || [],
            direction: direction

        };

    }

    function buildTree() {

        if (!data.length) return _tree;

        let currentNode = _mkNode({ 

            data: data[0], 
            direction: 1,
            parent: _tree

        });

        _tree.children.push(currentNode);

        for (let cur = 1, prev = 0, max = data.length; cur < max; ++cur, ++prev) {

            // determine which node is parent based on indentation.
            // make a new node
            // append node to parent's children

            const diff = data[ cur ].tag.length - data[ prev ].tag.length;

            // add child
            if (diff > 0) {
                let parentNode = currentNode;
                let newNode = _mkNode({ data: data[cur], parent: currentNode, direction: diff });
                parentNode.children.push(newNode);
            }

            // add sibling
            if (diff === 0) {
                let parentNode = _findAncestor(currentNode, diff);
                let newNode = _mkNode({ data: data[cur], parent: parentNode, direction: diff });
                parentNode.children.push(newNode);
            }

            // append to ancestor's children 
            if (diff < 0) {
                let parentNode = _findAncestor(currentNode, Math.abs(diff + 1));
                let newNode = _mkNode({ data: data[cur], parent: parentNode, direction: diff });
                parentNode.children.push(newNode);
            }
        }

    }

    function _dfs(node, callback) {

        for (let i = 0, max = node.children.length; i < max; ++i) {

            nodesProcessed += 1;

            let childNode = node.children[i];
            let { tag, title } = childNode.data;
            let direction = childNode.direction;
            let done = nodesProcessed === data.length;

            let callbackData = { tag, title, direction, done: done };

            output = callback(callbackData);
            _dfs(childNode, callback);

        } 

    }

    function processData(callback) {

        _dfs(_tree, callback);
        return output;

    }

    return {

        buildTree,
        processData

    };

};

module.exports = exports = Tree;
