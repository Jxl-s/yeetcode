import { BaseClasses } from '../common/classes';

export class JavaClasses implements BaseClasses {
    public static TreeNode = [
        'class TreeNode {',
        '    int val;',
        '    TreeNode left;',
        '    TreeNode right;',
        '    TreeNode(int x) { val = x; }',
        '};',
    ].join('\n');

    public static ListNode = [
        'class ListNode {',
        '    int val;',
        '    ListNode next;',
        '    ListNode(int x) { val = x; }',
        '};',
    ].join('\n');
}
