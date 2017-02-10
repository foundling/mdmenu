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

    function _bfs(node, callback) {

        for (let i = 0, max = node.children.length; i < max; ++i) {
            callback(node.children[i].data);
            _bfs(node.children[i], callback);
        } 

    }

    function toDom() {
        const root = _tree;
        _bfs(root, function(data) { 
            let count = data.tag.length; 
            console.log(`<h${count}>${ data.title }</h${count}>`); 
        }); 
    }

    return {

        buildTree,
        toDom

    };

};

module.exports = exports = Tree;