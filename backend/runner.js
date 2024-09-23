const axios = require('axios');

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
    { nums: [1, 5, 3, 7], target: 10 },
    { nums: [5, 10, 15, 20], target: 25 },
    { nums: [0, 4, 3, 0], target: 0 },
    { nums: [-1, -2, -3, -4], target: -5 },
    { nums: [5, 7, 9, 11], target: 16 },
    { nums: [1, 1, 1, 1], target: 2 },
    { nums: [10, 20, 30, 40], target: 50 },
    { nums: [2, 4, 6, 8], target: 10 },
    { nums: [1, 2, 3, 4, 5, 6], target: 11 },
    { nums: [10, 10, 15, 5], target: 20 },
    { nums: [2, 3, 5, 7], target: 10 },
    { nums: [1, 3, 5, 7, 9], target: 8 },
    { nums: [100, 200, 300], target: 400 },
    { nums: [-5, 0, 5, 10], target: 5 },
    { nums: [1, 2, 2, 3], target: 4 },
    { nums: [1, 1, 2, 2], target: 3 },
    { nums: [1, 5, 3, 7, 9], target: 8 },
    { nums: [0, 0, 0, 0], target: 0 },
    { nums: [-10, -20, -30, 10], target: -30 },
    { nums: [4, 4, 4, 4], target: 8 },
    { nums: [9, 1, 6, 4], target: 10 },
    { nums: [12, 28, 2, 3, 5], target: 10 },
    { nums: [6, 6, 6, 6], target: 12 },
    { nums: [2, 3, 7, 8], target: 10 },
    { nums: [1, 2, 4, 5, 7], target: 6 },
    { nums: [14, 7, 11, 15], target: 22 },
    { nums: [0, 1, 2, 3, 4], target: 5 },
    { nums: [1, 3, 4, 2], target: 5 },
    { nums: [-1, -2, 1, 2], target: 0 },
    { nums: [100, 100, 100], target: 200 },
    { nums: [1, 2, 3, 4, 5, 6], target: 10 },
    { nums: [3, 5, 6, 7, 8], target: 11 },
    { nums: [10, 5, 2, 3], target: 8 },
    { nums: [1, 2, 5, 6], target: 7 },
    { nums: [3, 8, 10, 12], target: 15 },
    { nums: [-3, 4, 3, 90], target: 0 },
    { nums: [2, 5, 7, 9, 12], target: 14 },
    { nums: [2, 3, 4, 8], target: 6 },
    { nums: [0, 5, 1, 4], target: 5 },
    { nums: [1, 2, 3, 4, 5], target: 8 },
    { nums: [1, 2, 3, 7], target: 10 },
    { nums: [6, 7, 1, 2], target: 8 },
    { nums: [3, 3, 3, 3], target: 6 },
    { nums: [4, 3, 2, 1], target: 5 },
    { nums: [7, 1, 2, 8], target: 9 },
    { nums: [10, 2, 3, 5], target: 8 },
    { nums: [10, 20, 30, 40, 50], target: 70 },
    { nums: [5, 5, 5, 5, 5], target: 10 },
];

const USER_CODE = `
class Solution:
    def twoSum(self, nums, target):
        d = {}
        for i, num in enumerate(nums):
            print(target - num)
            if target - num in d:
                return [d[target - num], i]
            d[num] = i

        return []
`;

const SOLUTION_CODE = `
class Solution:
    def twoSum(self, nums, target):
        d = {}
        for i, num in enumerate(nums):
            if target - num in d:
                return [d[target - num], i]
            d[num] = i

        return []
`;

function makeCode(userCode, separator) {
    return `
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

${userCode}

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
        print("${separator}")
        result_str = json.dumps(result)
        print(result_str, file=f)

with open('user.out', 'r') as f:
    print(f.read())
`;
}

const uuid = require('uuid').v4;

async function runCode(code) {
    const separator = '==TEST_' + uuid();
    const res = await axios.post(
        'http://localhost:2358/submissions?wait=true',
        {
            language_id: 71,
            source_code: makeCode(code, separator),
            stdin: TEST_CASES.map((testCase) => JSON.stringify(testCase)).join(
                '\n',
            ),
        },
    );

    const stdout = res.data.stdout.split(separator);
    const results = stdout.pop().trim();

    const real_stdout = [];
    for (let i = 0; i < stdout.length; i++) {
        real_stdout.push(stdout[i].trim());
    }

    return { results, stdout: real_stdout };
}

(async () => {
    const userRun = runCode(USER_CODE);
    const solRun = runCode(SOLUTION_CODE);

    const [{ results, stdout }, { results: good_results }] = await Promise.all([
        userRun,
        solRun,
    ]);

    // comparing results
    const resultsSplit = results.split('\n');
    const goodResultsSplit = good_results.split('\n');

    const output = [];
    for (let i = 0; i < resultsSplit.length; i++) {
        output.push({
            passed: resultsSplit[i] === goodResultsSplit[i],
            expected: goodResultsSplit[i],
            got: resultsSplit[i],
            stdout: stdout[i],
        });
    }

    console.log(output);
})();
