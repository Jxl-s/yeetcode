class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function deserializeList(arr) {
    let head = new ListNode();
    let cur = head;
    for (let i = 0; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    }
    return head.next;
}

function serializeList(head) {
    let arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    return arr;
}

module.exports = { ListNode, deserializeList, serializeList };