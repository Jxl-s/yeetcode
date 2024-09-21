const axios = require('axios');

const code = `
class Solution:
    def twoSum(self, nums, target):
        d = {}
        for i, num in enumerate(nums):
            if target - num in d:
                return [d[target - num], i]
            d[num] = i
        return []

// read test cases from stdin
a = list(map(int, input().split()))
b = int(input())

print(Solution().twoSum(a, b))
`;
