class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1:
            return s

        row_num = 0
        go_down = True

        rows = ["" for i in range(numRows)]
        for i in range(len(s)):
            if row_num == 0:
                go_down = True
            if row_num == numRows - 1:
                go_down = False
            
            rows[row_num] += s[i]

            if go_down:
                row_num += 1
            else:
                row_num -= 1

        return "".join(rows)