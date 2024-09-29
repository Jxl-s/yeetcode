import { BaseClasses } from '../common/classes';

export class Python3Classes implements BaseClasses {
    public static TreeNode = [
        'class TreeNode:',
        '\tdef __init__(self, x):',
        '\tself.val = x',
        '\tself.left = None',
        '\tself.right = None',
    ].join('\n');

    public static ListNode = [
        'class ListNode:',
        '\tdef __init__(self, x):',
        '\tself.val = x',
        '\tself.next = None',
    ].join('\n');
}
