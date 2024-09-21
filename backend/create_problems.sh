#!/bin/bash

# Array of problem titles, difficulties, tags, and types
problems=(
    "two-sum EASY array,hash-table ALGO"
    "add-two-numbers MEDIUM linked-list,math ALGO"
    "longest-substring-without-repeating-characters MEDIUM hash-table,string,sliding-window ALGO"
    "median-of-two-sorted-arrays HARD array,binary-search,divide-and-conquer ALGO"
    "longest-palindromic-substring MEDIUM string,dynamic-programming ALGO"
    "zigzag-conversion MEDIUM string ALGO"
    "reverse-integer MEDIUM math ALGO"
    "string-to-integer-atoi MEDIUM string ALGO"
    "palindrome-num EASY math ALGO"
    "regular-expression-matching HARD string,dynamic-programming,recursion ALGO"
    "container-with-most-water MEDIUM array,two-pointers ALGO"
    "integer-to-roman MEDIUM hash-table,math,string ALGO"
    "roman-to-integer EASY hash-table,math,string ALGO"
    "longest-common-prefix EASY string ALGO"
    "three-sum MEDIUM array,two-pointers,sorting ALGO"
    "three-sum-closest MEDIUM array,two-pointers,sorting ALGO"
    "letter-combinations-of-a-phone-num MEDIUM hash-table,string,backtracking ALGO"
    "four-sum MEDIUM array,two-pointers,sorting ALGO"
    "remove-nth-node-from-end-of-list MEDIUM linked-list,two-pointers ALGO"
    "valid-parentheses EASY string,stack ALGO"
    "merge-two-sorted-lists EASY linked-list,recursion ALGO"
)

# Metadata for each problem
metadata='
two-sum {"function":"twoSum","return":{"type":"array","items":{"type":"int"}},"args":[{"name":"nums","type":"array","items":{"type":"int"}},{"name":"target","type":"int"}]}
add-two-numbers {"function":"addTwoNumbers","return":{"type":"listnode"},"args":[{"name":"l1","type":"listnode"},{"name":"l2","type":"listnode"}]}
longest-substring-without-repeating-characters {"function":"lengthOfLongestSubstring","return":{"type":"int"},"args":[{"name":"s","type":"str"}]}
median-of-two-sorted-arrays {"function":"findMedianSortedArrays","return":{"type":"float"},"args":[{"name":"nums1","type":"array","items":{"type":"int"}},{"name":"nums2","type":"array","items":{"type":"int"}}]}
longest-palindromic-substring {"function":"longestPalindrome","return":{"type":"str"},"args":[{"name":"s","type":"str"}]}
zigzag-conversion {"function":"convert","return":{"type":"str"},"args":[{"name":"s","type":"str"},{"name":"numRows","type":"int"}]}
reverse-integer {"function":"reverse","return":{"type":"int"},"args":[{"name":"x","type":"int"}]}
string-to-integer-atoi {"function":"myAtoi","return":{"type":"int"},"args":[{"name":"s","type":"str"}]}
palindrome-num {"function":"isPalindrome","return":{"type":"bool"},"args":[{"name":"x","type":"int"}]}
regular-expression-matching {"function":"isMatch","return":{"type":"bool"},"args":[{"name":"s","type":"str"},{"name":"p","type":"str"}]}
container-with-most-water {"function":"maxArea","return":{"type":"int"},"args":[{"name":"height","type":"array","items":{"type":"int"}}]}
integer-to-roman {"function":"intToRoman","return":{"type":"str"},"args":[{"name":"num","type":"int"}]}
roman-to-integer {"function":"romanToInt","return":{"type":"int"},"args":[{"name":"s","type":"str"}]}
longest-common-prefix {"function":"longestCommonPrefix","return":{"type":"str"},"args":[{"name":"strs","type":"array","items":{"type":"str"}}]}
three-sum {"function":"threeSum","return":{"type":"array","items":{"type":"array","items":{"type":"int"}}},"args":[{"name":"nums","type":"array","items":{"type":"int"}}]}
three-sum-closest {"function":"threeSumClosest","return":{"type":"int"},"args":[{"name":"nums","type":"array","items":{"type":"int"}},{"name":"target","type":"int"}]}
letter-combinations-of-a-phone-num {"function":"letterCombinations","return":{"type":"array","items":{"type":"str"}},"args":[{"name":"digits","type":"str"}]}
four-sum {"function":"fourSum","return":{"type":"array","items":{"type":"array","items":{"type":"int"}}},"args":[{"name":"nums","type":"array","items":{"type":"int"}},{"name":"target","type":"int"}]}
remove-nth-node-from-end-of-list {"function":"removeNthFromEnd","return":{"type":"listnode"},"args":[{"name":"head","type":"listnode"},{"name":"n","type":"int"}]}
valid-parentheses {"function":"isValid","return":{"type":"bool"},"args":[{"name":"s","type":"str"}]}
merge-two-sorted-lists {"function":"mergeTwoLists","return":{"type":"listnode"},"args":[{"name":"l1","type":"listnode"},{"name":"l2","type":"listnode"}]}
'

# Function to get metadata for a problem
get_metadata() {
    local name=$1
    echo "$metadata" | grep "^$name " | cut -d' ' -f2-
}
create_tests() {
    local name=$1
    local dir=$2

    case "$name" in
        "two-sum")
            cat <<EOF > "${dir}/tests.json"
[ {"args": {"nums": [2,7,11,15], "target": 9}, "expected": [0,1]},
  {"args": {"nums": [3,2,4], "target": 6}, "expected": [1,2]},
  {"args": {"nums": [3,3], "target": 6}, "expected": [0,1]},
  {"args": {"nums": [1,2,3,4,5], "target": 9}, "expected": [3,4]},
  {"args": {"nums": [1,5,10,8,6], "target": 14}, "expected": [2,4]},
  {"args": {"nums": [3,9,12,13,15], "target": 24}, "expected": [2,3]},
  {"args": {"nums": [1,2], "target": 3}, "expected": [0,1]},
  {"args": {"nums": [0,4,3,0], "target": 0}, "expected": [0,3]},
  {"args": {"nums": [2,7,11,15], "target": 17}, "expected": [0,3]},
  {"args": {"nums": [1,1,1,1], "target": 2}, "expected": [0,1]} ]
EOF
            ;;
        "add-two-numbers")
            cat <<EOF > "${dir}/tests.json"
[ {"args": {"l1": [2,4,3], "l2": [5,6,4]}, "expected": [7,0,8]},
  {"args": {"l1": [0], "l2": [0]}, "expected": [0]},
  {"args": {"l1": [9,9,9,9,9,9,9], "l2": [9,9,9,9]}, "expected": [8,9,9,9,0,0,0,1]},
  {"args": {"l1": [1], "l2": [9,9,9]}, "expected": [0,0,0,1]},
  {"args": {"l1": [5], "l2": [5]}, "expected": [0,1]},
  {"args": {"l1": [5,6,4], "l2": [3,4,7]}, "expected": [8,0,2,1]},
  {"args": {"l1": [1,0,0,0,0,0,0,0,0,0,0], "l2": [5,6,4]}, "expected": [6,6,4,0,0,0,0,0,0,0,0]},
  {"args": {"l1": [9,9,9,9], "l2": [1]}, "expected": [0,0,0,0,1]},
  {"args": {"l1": [9,9,9,9,9], "l2": [1]}, "expected": [0,0,0,0,0,1]},
  {"args": {"l1": [2,4,3,7], "l2": [5,6,4]}, "expected": [7,0,8,7]} ]
EOF
            ;;
        "longest-substring-without-repeating-characters")
            cat <<EOF > "${dir}/tests.json"
[ {"args": {"s": "abcabcbb"}, "expected": 3},
  {"args": {"s": "bbbbb"}, "expected": 1},
  {"args": {"s": "pwwkew"}, "expected": 3},
  {"args": {"s": ""}, "expected": 0},
  {"args": {"s": "a"}, "expected": 1},
  {"args": {"s": "au"}, "expected": 2},
  {"args": {"s": "dvdf"}, "expected": 3},
  {"args": {"s": "abcdxyz"}, "expected": 7},
  {"args": {"s": "anviaj"}, "expected": 5},
  {"args": {"s": "tmmzuxt"}, "expected": 5} ]
EOF
            ;;
        "median-of-two-sorted-arrays")
            cat <<EOF > "${dir}/tests.json"
[ {"args": {"nums1": [1, 3], "nums2": [2]}, "expected": 2.0},
  {"args": {"nums1": [1, 2], "nums2": [3, 4]}, "expected": 2.5},
  {"args": {"nums1": [0, 0], "nums2": [0, 0]}, "expected": 0.0},
  {"args": {"nums1": [], "nums2": [1]}, "expected": 1.0},
  {"args": {"nums1": [2], "nums2": []}, "expected": 2.0},
  {"args": {"nums1": [1, 3, 8], "nums2": [7, 9]}, "expected": 7.0},
  {"args": {"nums1": [1, 3, 8], "nums2": [7]}, "expected": 6.0},
  {"args": {"nums1": [1, 2], "nums2": [1, 2]}, "expected": 1.5},
  {"args": {"nums1": [2, 3], "nums2": [4]}, "expected": 3.0},
  {"args": {"nums1": [1, 1, 1], "nums2": [1, 1, 1]}, "expected": 1.0} ]
EOF
            ;;
        "longest-palindromic-substring")
            cat <<EOF > "${dir}/tests.json"
[ {"args": {"s": "babad"}, "expected": "bab"},
  {"args": {"s": "cbbd"}, "expected": "bb"},
  {"args": {"s": "a"}, "expected": "a"},
  {"args": {"s": "ac"}, "expected": "a"},
  {"args": {"s": "racecar"}, "expected": "racecar"},
  {"args": {"s": "aabbcc"}, "expected": "aa"},
  {"args": {"s": "aabba"}, "expected": "abba"},
  {"args": {"s": "abcba"}, "expected": "abcba"},
  {"args": {"s": "abb"}, "expected": "bb"},
  {"args": {"s": "abcd"}, "expected": "a"} ]
EOF
            ;;
        "zigzag-conversion")
            cat <<EOF > "${dir}/tests.json"
[ {"args": {"s": "PAYPALISHIRING", "numRows": 3}, "expected": "PAHNAPLSIIGYIR"},
  {"args": {"s": "PAYPALISHIRING", "numRows": 4}, "expected": "PINALSIGYAHRPI"},
  {"args": {"s": "A", "numRows": 1}, "expected": "A"},
  {"args": {"s": "AB", "numRows": 1}, "expected": "AB"},
  {"args": {"s": "ABCDE", "numRows": 2}, "expected": "ACEBD"},
  {"args": {"s": "ABCDE", "numRows": 3}, "expected": "AEBDC"},
  {"args": {"s": "ABCDEF", "numRows": 3}, "expected": "AEBDFC"},
  {"args": {"s": "ABCDEFG", "numRows": 2}, "expected": "ACEGBDF"},
  {"args": {"s": "ABCD", "numRows": 2}, "expected": "ACBD"},
  {"args": {"s": "ABCD", "numRows": 3}, "expected": "ABDC"} ]
EOF
            ;;
        "reverse-integer")
            cat <<EOF > "${dir}/tests.json"
[ {"args": {"x": 123}, "expected": 321},
  {"args": {"x": -123}, "expected": -321},
  {"args": {"x": 120}, "expected": 21},
  {"args": {"x": 0}, "expected": 0},
  {"args": {"x": 1534236469}, "expected": 0},
  {"args": {"x": -2147483648}, "expected": 0},
  {"args": {"x": 2147483647}, "expected": 0},
  {"args": {"x": -10}, "expected": -1},
  {"args": {"x": 1000000003}, "expected": 0},
  {"args": {"x": 100}, "expected": 1} ]
EOF
            ;;
        "palindrome-num")
            cat <<EOF > "${dir}/tests.json"
[ {"args": {"x": 121}, "expected": true},
  {"args": {"x": -121}, "expected": false},
  {"args": {"x": 10}, "expected": false},
  {"args": {"x": 12321}, "expected": true},
  {"args": {"x": 123456789987654321}, "expected": true},
  {"args": {"x": -1234321}, "expected": false},
  {"args": {"x": 1234321}, "expected": true},
  {"args": {"x": 0}, "expected": true},
  {"args": {"x": 1001}, "expected": true},
  {"args": {"x": 101}, "expected": true} ]
EOF
            ;;
        *)
            echo "No test cases available for $name"
            ;;
    esac
}


# Function to create problem directory and files
create_problem() {
    local number=$1
    local name=$2
    local difficulty=$3
    local tags=$4
    local type=$5

    # Format the number to be 5 digits with leading zeros
    local formatted_number=$(printf "%05d" $number)

    # Create the directory
    local dir="problems/${formatted_number}-${name}"
    mkdir -p "$dir"

    # Get metadata for the problem
    local problem_metadata=$(get_metadata "$name")

    # Create data.json file
    cat <<EOF > "${dir}/data.json"
{
    "id": "${name}",
    "title": "$(echo $name | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')",
    "difficulty": "${difficulty}",
    "tags": ["$(echo $tags | sed 's/,/","/g')"],
    "type": "${type}",
    "metadata": ${problem_metadata}
}
EOF

    # Generate the tests.json file
    create_tests "$name" "$dir"

    # Create description.md file
    echo "# ${name}" > "${dir}/description.md"
}

# Loop through the problems array and create directories and files
for i in "${!problems[@]}"; do
    problem=(${problems[$i]})
    create_problem $((i + 1)) "${problem[0]}" "${problem[1]}" "${problem[2]}" "${problem[3]}"
done
