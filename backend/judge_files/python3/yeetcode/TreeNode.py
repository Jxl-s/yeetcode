class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def deserialize_tree(arr):
    if not arr:
        return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while i < len(arr):
        node = q.popleft()
        if arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root

def serialize_tree(root):
    if not root:
        return []
    q = deque([root])
    arr = [root.val]
    while any(q):
        node = q.popleft()
        if node.left:
            q.append(node.left)
            arr.append(node.left.val)
        else:
            arr.append(None)
        if node.right:
            q.append(node.right)
            arr.append(node.right.val)
        else:
            arr.append(None)
    while arr and arr[-1] is None:
        arr.pop()
    return arr