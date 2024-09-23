class Solution:
    def longestPalindrome(self, s: str) -> str:
        left, right = 0, 0
        n = len(s)

        for i in range(n):
            j = 0
            while i - j >= 0 and i + j < n and s[i - j] == s[i + j]:
                if 2 * j + 1 > right - left + 1:
                    left = i - j
                    right = i + j

                j += 1
            
            j = 0
            while i - j - 1 >= 0 and i + j < n and s[i - j - 1] == s[i + j]:
                if 2 * j + 2 > right - left + 1:
                    left = i - j - 1
                    right = i + j

                j += 1
            
        return s[left:right+1]