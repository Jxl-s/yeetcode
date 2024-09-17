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
two-sum {"function":"twoSum","return":{"type":"array","items":{"type":"int"}},"arguments":[{"name":"nums","type":"array","items":{"type":"int"}},{"name":"target","type":"int"}]}
add-two-numbers {"function":"addTwoNumbers","return":{"type":"listnode"},"arguments":[{"name":"l1","type":"listnode"},{"name":"l2","type":"listnode"}]}
longest-substring-without-repeating-characters {"function":"lengthOfLongestSubstring","return":{"type":"int"},"arguments":[{"name":"s","type":"str"}]}
median-of-two-sorted-arrays {"function":"findMedianSortedArrays","return":{"type":"float"},"arguments":[{"name":"nums1","type":"array","items":{"type":"int"}},{"name":"nums2","type":"array","items":{"type":"int"}}]}
longest-palindromic-substring {"function":"longestPalindrome","return":{"type":"str"},"arguments":[{"name":"s","type":"str"}]}
zigzag-conversion {"function":"convert","return":{"type":"str"},"arguments":[{"name":"s","type":"str"},{"name":"numRows","type":"int"}]}
reverse-integer {"function":"reverse","return":{"type":"int"},"arguments":[{"name":"x","type":"int"}]}
string-to-integer-atoi {"function":"myAtoi","return":{"type":"int"},"arguments":[{"name":"s","type":"str"}]}
palindrome-num {"function":"isPalindrome","return":{"type":"bool"},"arguments":[{"name":"x","type":"int"}]}
regular-expression-matching {"function":"isMatch","return":{"type":"bool"},"arguments":[{"name":"s","type":"str"},{"name":"p","type":"str"}]}
container-with-most-water {"function":"maxArea","return":{"type":"int"},"arguments":[{"name":"height","type":"array","items":{"type":"int"}}]}
integer-to-roman {"function":"intToRoman","return":{"type":"str"},"arguments":[{"name":"num","type":"int"}]}
roman-to-integer {"function":"romanToInt","return":{"type":"int"},"arguments":[{"name":"s","type":"str"}]}
longest-common-prefix {"function":"longestCommonPrefix","return":{"type":"str"},"arguments":[{"name":"strs","type":"array","items":{"type":"str"}}]}
three-sum {"function":"threeSum","return":{"type":"array","items":{"type":"array","items":{"type":"int"}}},"arguments":[{"name":"nums","type":"array","items":{"type":"int"}}]}
three-sum-closest {"function":"threeSumClosest","return":{"type":"int"},"arguments":[{"name":"nums","type":"array","items":{"type":"int"}},{"name":"target","type":"int"}]}
letter-combinations-of-a-phone-num {"function":"letterCombinations","return":{"type":"array","items":{"type":"str"}},"arguments":[{"name":"digits","type":"str"}]}
four-sum {"function":"fourSum","return":{"type":"array","items":{"type":"array","items":{"type":"int"}}},"arguments":[{"name":"nums","type":"array","items":{"type":"int"}},{"name":"target","type":"int"}]}
remove-nth-node-from-end-of-list {"function":"removeNthFromEnd","return":{"type":"listnode"},"arguments":[{"name":"head","type":"listnode"},{"name":"n","type":"int"}]}
valid-parentheses {"function":"isValid","return":{"type":"bool"},"arguments":[{"name":"s","type":"str"}]}
merge-two-sorted-lists {"function":"mergeTwoLists","return":{"type":"listnode"},"arguments":[{"name":"l1","type":"listnode"},{"name":"l2","type":"listnode"}]}
'

# Function to get metadata for a problem
get_metadata() {
    local name=$1
    echo "$metadata" | grep "^$name " | cut -d' ' -f2-
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

    # Create description.md file
    echo "# ${name}" > "${dir}/description.md"
}

# Loop through the problems array and create directories and files
for i in "${!problems[@]}"; do
    problem=(${problems[$i]})
    create_problem $((i + 1)) "${problem[0]}" "${problem[1]}" "${problem[2]}" "${problem[3]}"
done