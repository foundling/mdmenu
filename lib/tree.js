const Tree = function(data) {

    let _tree = _mkNode({ 

        data: null, 
        parent: null, 
        children: [] 

    });


    function _findAncestor(node, distance) {

        while (distance > 0) {
            node = node.parent;
            --distance;
        }

        return node;

    }  

    function _mkNode({ data, parent, children }) {

        return {

            data: data,
            parent: parent,
            children: children || []

        };

    }

    function buildTree() {

        if (!data.length) return _tree;

        let currentNode = _mkNode({ 
            data: data[0], 
            parent: _tree
        });

        _tree.children.push(currentNode);

        for (let cur = 1, prev = 0, max = data.length; cur < max; ++cur, ++prev) {

            const diff = data[ cur ].tag.length - data[ prev ].tag.length;

            // add child
            if (diff > 0) {
                let parentNode = currentNode;
                let newNode = _mkNode({ data: data[cur], parent: currentNode });
                parentNode.children.push(newNode);
            }
            // add sibling
            if (diff === 0) {
                let parentNode = _findAncestor(currentNode, diff);
                let newNode = _mkNode({ data: data[cur], parent: parentNode });
                parentNode.children.push(newNode);
            }
            // append to ancestor's children 
            if (diff < 0) {
                let parentNode = _findAncestor(currentNode, Math.abs(diff + 1));
                let newNode = _mkNode({ data: data[cur], parent: parentNode });
                parentNode.children.push(newNode);
            }
        }

    }

    function _bfs(node, count, callback) {

        for (let i = 0, max = node.children.length; i < max; ++i) {

            let childNode = node.children[i];
            let {tag, title} = childNode.data;
            let isLeaf = !childNode.children;
            let callbackData = {
                tag,
                title,
                isLeaf
            };
            callback(callbackData);
            _bfs(node.children[i], count, callback);

        } 

    }

    function processData(callback) {

        const root = _tree;
        _bfs(root, 0, callback);

    }

    return {

        buildTree,
        processData

    };

};

module.exports = exports = Tree;
