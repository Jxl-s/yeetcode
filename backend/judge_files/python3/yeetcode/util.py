from yeetcode.treenode import serialize_tree, deserialize_tree
from yeetcode.listnode import serialize_list, deserialize_list

def deserialize(arg, arg_type):
    if arg_type == "ListNode":
        return deserialize_list(arg)
    elif arg_type == "TreeNode":
        return deserialize_tree(arg)
    else:
        return arg

def serialize(arg, arg_type):
    if arg_type == "ListNode":
        return serialize_list(arg)
    elif arg_type == "TreeNode":
        return serialize_tree(arg)
    else:
        return arg