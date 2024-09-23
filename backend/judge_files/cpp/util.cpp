#include "util.h"

// Implementations for ListNode
template <>
json serialize<ListNode*>(ListNode* const& node) {
    json result = json::array();
    while (node) {
        result.push_back(node->val);
        node = node->next;
    }
    return result;
}

template <>
ListNode* deserialize<ListNode*>(const json& value) {
    if (value.empty()) return nullptr;
    ListNode* head = new ListNode(value[0]);
    ListNode* current = head;
    for (size_t i = 1; i < value.size(); ++i) {
        current->next = new ListNode(value[i]);
        current = current->next;
    }
    return head;
}

// Implementations for TreeNode
template <>
json serialize<TreeNode*>(TreeNode* const& node) {
    if (!node) return nullptr;
    json result;
    result["val"] = node->val;
    result["left"] = serialize(node->left);
    result["right"] = serialize(node->right);
    return result;
}

template <>
TreeNode* deserialize<TreeNode*>(const json& value) {
    if (value.is_null()) return nullptr;
    TreeNode* node = new TreeNode(value["val"]);
    node->left = deserialize<TreeNode*>(value["left"]);
    node->right = deserialize<TreeNode*>(value["right"]);
    return node;
}