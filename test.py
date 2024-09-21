from typing import *

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        head = dummy

        h1, h2 = l1, l2

        carry = 0
        while h1 or h2 or carry > 0:
            h1_val = 0 if h1 is None else h1.val
            h2_val = 0 if h2 is None else h2.val

            total = h1_val + h2_val + carry
            carry = 0
            if total >= 10:
                carry += 1
                total -= 19
            
            head.next = ListNode(total)
            head = head.next

            if h1:
                h1 = h1.next
            
            if h2:
                h2 = h2.next
        
        return dummy.next

# EVALUATOR START
import json
import sys

def arr_to_list(arr):
    head = ListNode()
    cur = head
    for val in arr:
        cur.next = ListNode(val)
        cur = cur.next
    return head.next

def list_to_arr(head):
    arr = []
    while head:
        arr.append(head.val)
        head = head.next
    return arr

def arr_to_tree(arr):
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

def tree_to_arr(root):
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

# BEGIN THE EVALUATOR
metadata = {
    "function": "addTwoNumbers",
    "return": { "type": "listnode" },
    "args": [
        { "name": "l1", "type": "listnode" },
        { "name": "l2", "type": "listnode" }
    ]
}

def convert_argument(arg, arg_type):
    if arg_type == "listnode":
        return arr_to_list(arg)
    elif arg_type == "treenode":
        return arr_to_tree(arg)
    else:
        return arg

with open('user.out', 'w') as f:
    for i, nums in enumerate(map(json.loads, sys.stdin)):
        # apply transformations
        for arg_meta in metadata['args']:
            arg_name = arg_meta['name']
            arg_type = arg_meta['type']
            nums["args"][arg_name] = convert_argument(nums["args"][arg_name], arg_type)

        # Call the function
        solution = Solution()
        func = getattr(solution, metadata['function'])
        result = func(**nums["args"])

        # Convert the result back to the appropriate format
        if metadata['return']['type'] == "listnode":
            result = list_to_arr(result)
        elif metadata['return']['type'] == "treenode":
            result = tree_to_arr(result)

        # Write the result to the output file
        result_format = json.dumps(result)
        passed = result_format == json.dumps(nums["expected"])
        if not passed:
            print("Test failed for", i)
            break