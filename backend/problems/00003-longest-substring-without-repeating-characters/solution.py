class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        i, j = 0, 0
        max_len = 0
        seen = set()

        while j < len(s):
            while s[j] in seen:
                seen.remove(s[i])
                i += 1
            
            seen.add(s[j])
            max_len = max(max_len, j - i + 1)
            j += 1
        
        return max_len