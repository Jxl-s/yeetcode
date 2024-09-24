const { serializeList, deserializeList } = require('./listnode');
const { serializeTree, deserializeTree } = require('./treenode');

function deserialize(arg, argType) {
    if (argType.type === 'ListNode') {
        return deserializeList(arg);
    } else if (argType.type === 'TreeNode') {
        return deserializeTree(arg);
    } else if (argType.type === 'array') {
        return arg.map((item) => deserialize(item, argType.items));
    } else {
        return arg;
    }
}

function serialize(arg, argType) {
    if (argType.type === 'ListNode') {
        return serializeList(arg);
    } else if (argType.type === 'TreeNode') {
        return serializeTree(arg);
    } else if (argType.type === 'array') {
        return arg.map((item) => serialize(item, argType.items));
    } else {
        return arg;
    }
}

module.exports = { deserialize, serialize };
