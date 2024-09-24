from yeetcode.treenode import serialize_tree, deserialize_tree
from yeetcode.listnode import serialize_list, deserialize_list

def deserialize(arg, arg_type):
    if arg_type['type'] == "ListNode":
        return deserialize_list(arg)
    elif arg_type['type'] == "TreeNode":
        return deserialize_tree(arg)
    elif arg_type['type'] == "array":
        return [deserialize(item, arg_type['items']) for item in arg]
    else:
        return arg

def serialize(arg, arg_type):
    if arg_type['type'] == "ListNode":
        return serialize_list(arg)
    elif arg_type['type'] == "TreeNode":
        return serialize_tree(arg)
    elif arg_type['type'] == "array":
        return [serialize(item, arg_type['items']) for item in arg]
    else:
        return arg