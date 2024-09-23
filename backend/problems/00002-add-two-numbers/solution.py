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
                total -= 10
            
            head.next = ListNode(total)
            head = head.next

            if h1:
                h1 = h1.next
            
            if h2:
                h2 = h2.next
        
        return dummy.next