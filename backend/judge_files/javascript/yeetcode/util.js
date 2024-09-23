// Import necessary functions for ListNode and TreeNode
const { serializeList, deserializeList } = require('./listnode');
const { serializeTree, deserializeTree } = require('./treenode');

/**
 * Deserialize the argument based on its type.
 * @param {any} arg - The argument to deserialize.
 * @param {string} argType - The type of the argument.
 * @returns {any} - The deserialized argument.
 */
function deserialize(arg, argType) {
    if (argType === 'ListNode') {
        return deserializeList(arg);
    } else if (argType === 'TreeNode') {
        return deserializeTree(arg);
    } else {
        return arg;
    }
}

/**
 * Serialize the argument based on its type.
 * @param {any} arg - The argument to serialize.
 * @param {string} argType - The type of the argument.
 * @returns {any} - The serialized argument.
 */
function serialize(arg, argType) {
    if (argType === 'ListNode') {
        return serializeList(arg);
    } else if (argType === 'TreeNode') {
        return serializeTree(arg);
    } else {
        return arg;
    }
}

module.exports = { deserialize, serialize };
