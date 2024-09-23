#ifndef UTIL_H
#define UTIL_H

#include "json.hpp"
#include "listnode.h"
#include "treenode.h"

using json = nlohmann::json;

template <typename T>
json serialize(const T& value);

template <typename T>
T deserialize(const json& value);

// Specializations for ListNode and TreeNode
template <>
json serialize<ListNode*>(ListNode* const& node);

template <>
ListNode* deserialize<ListNode*>(const json& value);

template <>
json serialize<TreeNode*>(TreeNode* const& node);

template <>
TreeNode* deserialize<TreeNode*>(const json& value);

#endif // UTIL_H