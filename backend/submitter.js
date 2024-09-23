const axios = require('axios');

const RAND_SEPARATOR = '03701c7b-5199-4ba5-8289-a054cf9052c0';
const METADATA = {
    function: 'twoSum',
    return: { type: 'array', items: { type: 'int' } },
    args: [
        { name: 'nums', type: 'array', items: { type: 'int' } },
        { name: 'target', type: 'int' },
    ],
};

const TEST_CASES = [
    { nums: [2, 7, 11, 15], target: 9 },
    { nums: [3, 2, 4], target: 6 },
    { nums: [3, 3], target: 6 },
    { nums: [1, 2, 3, 4, 5], target: 9 },
];

const code = `
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
    def twoSum(self, nums, target):
        d = {}
        for i, num in enumerate(nums):
            print(target - num)
            if target - num in d:
                return [d[target - num], i]
            d[num] = i

        return []

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

def deserialize(arg, arg_type):
    if arg_type == "ListNode":
        return arr_to_list(arg)
    elif arg_type == "TreeNode":
        return arr_to_tree(arg)
    else:
        return arg

def serialize(arg, arg_type):
    if arg_type == "ListNode":
        return list_to_arr(arg)
    elif arg_type == "TreeNode":
        return tree_to_arr(arg)
    else:
        return arg

with open('user.out', 'w') as f:
    for i, data in enumerate(map(json.loads, sys.stdin)):
${METADATA.args.map((arg, i) => `        arg_${i + 1} = deserialize(data['${arg.name}'], '${arg.type}')`).join('\n')}

        result = Solution().${METADATA.function}(${METADATA.args.map((_, i) => `arg_${i + 1}`).join(', ')})
        result = serialize(result, '${METADATA.return.type}')
        print("===TEST_${RAND_SEPARATOR}===")
        result_str = json.dumps(result)
        print(result_str, file=f)

with open('user.out', 'r') as f:
    print(f.read())
`;

(async () => {
    const res = await axios.post(
        'http://localhost:2358/submissions?wait=true',
        {
            language_id: 71,
            source_code: code,
            stdin: TEST_CASES.map((testCase) => JSON.stringify(testCase)).join(
                '\n',
            ),
        },
    );

    const stdout = res.data.stdout.split(
        '===TEST_03701c7b-5199-4ba5-8289-a054cf9052c0===',
    );

    const results = stdout.pop().trim();
    for (let i = 0; i < stdout.length; i++) {
        console.log(`TEST ${i}:\n${stdout[i].trim()}`);
    }

    console.log(`OUTPUT:\n${results}`);
})();
