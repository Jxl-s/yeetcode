class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def deserialize_list(arr):
    head = ListNode()
    cur = head
    for val in arr:
        cur.next = ListNode(val)
        cur = cur.next
    return head.next

def serialize_list(head):
    arr = []
    while head:
        arr.append(head.val)
        head = head.next
    return arr