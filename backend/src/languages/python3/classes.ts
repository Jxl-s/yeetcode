import { BaseClasses } from '../common/classes';

export class Python3Classes implements BaseClasses {
    public static TreeNode = [
        'class TreeNode:',
        '    def __init__(self, x):',
        '        self.val = x',
        '        self.left = None',
        '        self.right = None',
    ].join('\n');

    public static ListNode = [
        'class ListNode:',
        '    def __init__(self, x):',
        '        self.val = x',
        '        self.next = None',
    ].join('\n');
}
