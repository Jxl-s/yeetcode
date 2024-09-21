export class CppClasses {
    public static TreeNode = [
        'class TreeNode {',
        'public:',
        '    int val;',
        '    TreeNode* left;',
        '    TreeNode* right;',
        '    TreeNode(int x) : val(x), left(NULL), right(NULL) {}',
        '};',
    ].join('\n');

    public static ListNode = [
        'class ListNode {',
        'public:',
        '    int val;',
        '    ListNode* next;',
        '    ListNode(int x) : val(x), next(NULL) {}',
        '};',
    ].join('\n');
}
