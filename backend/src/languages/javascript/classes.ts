import { BaseClasses } from '../common/classes';

export class JavaScriptClasses implements BaseClasses {
    public static TreeNode = [
        'class TreeNode {',
        '    constructor(val) {',
        '        this.val = val;',
        '        this.left = null;',
        '        this.right = null;',
        '    }',
        '}',
    ].join('\n');

    public static ListNode = [
        'class ListNode {',
        '    constructor(val) {',
        '        this.val = val;',
        '        this.next = null;',
        '    }',
        '}',
    ].join('\n');
}
