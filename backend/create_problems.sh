#!/bin/bash

# Array of problem titles, difficulties, and tags
declare -a problems=(
    "two-sum EASY array,hash-table"
    "add-two-numbers MEDIUM linked-list,math"
    "longest-substring-without-repeating-characters MEDIUM hash-table,string,sliding-window"
    "median-of-two-sorted-arrays HARD array,binary-search,divide-and-conquer"
    "longest-palindromic-substring MEDIUM string,dynamic-programming"
    "zigzag-conversion MEDIUM string"
    "reverse-integer MEDIUM math"
    "string-to-integer-atoi MEDIUM string"
    "palindrome-number EASY math"
    "regular-expression-matching HARD string,dynamic-programming,recursion"
    "container-with-most-water MEDIUM array,two-pointers"
    "integer-to-roman MEDIUM hash-table,math,string"
    "roman-to-integer EASY hash-table,math,string"
    "longest-common-prefix EASY string"
    "3sum MEDIUM array,two-pointers,sorting"
    "3sum-closest MEDIUM array,two-pointers,sorting"
    "letter-combinations-of-a-phone-number MEDIUM hash-table,string,backtracking"
    "4sum MEDIUM array,two-pointers,sorting"
    "remove-nth-node-from-end-of-list MEDIUM linked-list,two-pointers"
    "valid-parentheses EASY string,stack"
    "merge-two-sorted-lists EASY linked-list,recursion"
    "generate-parentheses MEDIUM string,dynamic-programming,backtracking"
    "merge-k-sorted-lists HARD linked-list,divide-and-conquer,heap-priority-queue,merge-sort"
    "swap-nodes-in-pairs MEDIUM linked-list,recursion"
    "reverse-nodes-in-k-group HARD linked-list,recursion"
    "remove-duplicates-from-sorted-array EASY array,two-pointers"
    "remove-element EASY array,two-pointers"
    "implement-strstr EASY two-pointers,string,string-matching"
    "divide-two-integers MEDIUM math"
    "substring-with-concatenation-of-all-words HARD hash-table,string,sliding-window"
    "next-permutation MEDIUM array,two-pointers"
    "longest-valid-parentheses HARD string,dynamic-programming,stack"
    "search-in-rotated-sorted-array MEDIUM array,binary-search"
    "find-first-and-last-position-of-element-in-sorted-array MEDIUM array,binary-search"
    "search-insert-position EASY array,binary-search"
    "valid-sudoku MEDIUM array,hash-table,matrix"
    "sudoku-solver HARD array,backtracking,matrix"
    "count-and-say MEDIUM string"
    "combination-sum MEDIUM array,backtracking"
    "combination-sum-ii MEDIUM array,backtracking"
    "first-missing-positive HARD array,hash-table"
    "trapping-rain-water HARD array,two-pointers,dynamic-programming,stack"
    "multiply-strings MEDIUM math,string,simulation"
    "wildcard-matching HARD string,dynamic-programming,greedy,recursion"
    "jump-game-ii HARD array,dynamic-programming,greedy"
    "permutations MEDIUM array,backtracking"
    "permutations-ii MEDIUM array,backtracking"
    "rotate-image MEDIUM array,matrix"
    "group-anagrams MEDIUM hash-table,string,sorting"
    "powx-n MEDIUM math,recursion"
    "maximum-subarray MEDIUM array,divide-and-conquer,dynamic-programming"
    "spiral-matrix MEDIUM array,matrix,simulation"
    "jump-game MEDIUM array,dynamic-programming,greedy"
    "merge-intervals MEDIUM array,sorting"
    "insert-interval MEDIUM array"
    "length-of-last-word EASY string"
    "spiral-matrix-ii MEDIUM array,matrix,simulation"
    "permutation-sequence HARD math,backtracking"
    "rotate-list MEDIUM linked-list,two-pointers"
    "unique-paths MEDIUM math,dynamic-programming,combinatorics"
    "unique-paths-ii MEDIUM array,dynamic-programming,matrix"
    "minimum-path-sum MEDIUM array,dynamic-programming,matrix"
    "valid-number HARD string"
    "plus-one EASY array,math"
    "add-binary EASY math,string,bit-manipulation,simulation"
    "text-justification HARD array,string,simulation"
    "sqrtx EASY math,binary-search"
    "climbing-stairs EASY dynamic-programming,math,memoization"
    "simplify-path MEDIUM string,stack"
    "edit-distance HARD string,dynamic-programming"
    "set-matrix-zeroes MEDIUM array,hash-table,matrix"
    "search-a-2d-matrix MEDIUM array,binary-search,matrix"
    "sort-colors MEDIUM array,two-pointers,sorting"
    "minimum-window-substring HARD hash-table,string,sliding-window"
    "combinations MEDIUM backtracking"
    "subsets MEDIUM array,backtracking,bit-manipulation"
    "word-search MEDIUM array,backtracking,matrix"
    "remove-duplicates-from-sorted-array-ii MEDIUM array,two-pointers"
    "search-in-rotated-sorted-array-ii MEDIUM array,binary-search"
    "remove-duplicates-from-sorted-list-ii MEDIUM linked-list"
    "largest-rectangle-in-histogram HARD array,stack,monotonic-stack"
    "maximal-rectangle HARD array,dynamic-programming,stack,matrix"
    "partition-list MEDIUM linked-list,two-pointers"
    "scramble-string HARD string,dynamic-programming"
    "merge-sorted-array EASY array,two-pointers,sorting"
    "gray-code MEDIUM math,backtracking,bit-manipulation"
    "subsets-ii MEDIUM array,backtracking,bit-manipulation"
    "decode-ways MEDIUM string,dynamic-programming"
    "reverse-linked-list-ii MEDIUM linked-list"
    "restore-ip-addresses MEDIUM string,backtracking"
    "binary-tree-inorder-traversal EASY stack,tree,depth-first-search,binary-tree"
    "unique-binary-search-trees MEDIUM math,dynamic-programming,tree,binary-search-tree,binary-tree"
    "unique-binary-search-trees-ii MEDIUM dynamic-programming,tree,binary-search-tree,backtracking,binary-tree"
    "interleaving-string HARD string,dynamic-programming"
    "validate-binary-search-tree MEDIUM tree,depth-first-search,binary-search-tree,binary-tree"
    "recover-binary-search-tree HARD tree,depth-first-search,binary-search-tree,binary-tree"
    "same-tree EASY tree,depth-first-search,breadth-first-search,binary-tree"
    "symmetric-tree EASY tree,depth-first-search,breadth-first-search,binary-tree"
    "binary-tree-level-order-traversal MEDIUM tree,breadth-first-search,binary-tree"
    "binary-tree-zigzag-level-order-traversal MEDIUM tree,breadth-first-search,binary-tree"
    "maximum-depth-of-binary-tree EASY tree,depth-first-search,breadth-first-search,binary-tree"
    "construct-binary-tree-from-preorder-and-inorder-traversal MEDIUM array,hash-table,divide-and-conquer,tree,binary-tree"
    "construct-binary-tree-from-inorder-and-postorder-traversal HARD array,hash-table,divide-and-conquer,tree,binary-tree"
    "binary-tree-level-order-traversal-ii MEDIUM tree,breadth-first-search,binary-tree"
    "convert-sorted-array-to-binary-search-tree EASY array,divide-and-conquer,tree,binary-search-tree,binary-tree"
    "convert-sorted-list-to-binary-search-tree MEDIUM linked-list,divide-and-conquer,tree,binary-search-tree,binary-tree"
    "balanced-binary-tree EASY tree,depth-first-search,binary-tree"
    "minimum-depth-of-binary-tree EASY tree,depth-first-search,breadth-first-search,binary-tree"
    "path-sum EASY tree,depth-first-search,breadth-first-search,binary-tree"
    "path-sum-ii MEDIUM backtracking,tree,depth-first-search,binary-tree"
    "flatten-binary-tree-to-linked-list MEDIUM linked-list,stack,tree,depth-first-search,binary-tree"
    "distinct-subsequences HARD string,dynamic-programming"
    "populating-next-right-pointers-in-each-node MEDIUM linked-list,tree,depth-first-search,breadth-first-search,binary-tree"
    "populating-next-right-pointers-in-each-node-ii MEDIUM linked-list,tree,depth-first-search,breadth-first-search,binary-tree"
    "triangle MEDIUM array,dynamic-programming"
    "best-time-to-buy-and-sell-stock EASY array,dynamic-programming"
    "best-time-to-buy-and-sell-stock-ii MEDIUM array,dynamic-programming,greedy"
    "best-time-to-buy-and-sell-stock-iii HARD array,dynamic-programming"
    "binary-tree-maximum-path-sum HARD dynamic-programming,tree,depth-first-search,binary-tree"
    "valid-palindrome EASY two-pointers,string"
    "word-ladder HARD hash-table,string,breadth-first-search"
    "longest-consecutive-sequence MEDIUM array,hash-table,union-find"
    "sum-root-to-leaf-numbers MEDIUM tree,depth-first-search,binary-tree"
    "surrounded-regions MEDIUM array,depth-first-search,breadth-first-search,union-find,matrix"
    "palindrome-partitioning MEDIUM string,dynamic-programming,backtracking"
    "palindrome-partitioning-ii HARD string,dynamic-programming"
    "clone-graph MEDIUM hash-table,depth-first-search,breadth-first-search,graph"
    "gas-station MEDIUM array,greedy"
    "candy HARD array,greedy"
    "single-number EASY array,bit-manipulation"
    "single-number-ii MEDIUM array,bit-manipulation"
    "copy-list-with-random-pointer MEDIUM hash-table,linked-list"
    "word-break MEDIUM hash-table,string,dynamic-programming,trie,memoization"
    "word-break-ii HARD hash-table,string,dynamic-programming,backtracking,trie,memoization"
    "linked-list-cycle EASY hash-table,linked-list,two-pointers"
    "linked-list-cycle-ii MEDIUM hash-table,linked-list,two-pointers"
    "reorder-list MEDIUM linked-list,two-pointers,stack,recursion"
    "binary-tree-preorder-traversal EASY stack,tree,depth-first-search,binary-tree"
    "binary-tree-inorder-traversal EASY stack,tree,depth-first-search,binary-tree"
    "binary-tree-postorder-traversal EASY stack,tree,depth-first-search,binary-tree"
    "binary-search-tree-iterator MEDIUM stack,tree,design,binary-search-tree,iterator,binary-tree"
    "lru-cache MEDIUM hash-table,linked-list,design,doubly-linked-list"
    "insertion-sort-list MEDIUM linked-list,sorting"
    "sort-list MEDIUM linked-list,two-pointers,divide-and-conquer,sorting,merge-sort"
    "maximum-gap HARD array,sorting,bucket-sort,radix-sort"
    "fraction-to-recurring-decimal MEDIUM hash-table,math,string"
    "two-sum-ii-input-array-is-sorted MEDIUM array,two-pointers,binary-search"
    "excel-sheet-column-title EASY math,string"
    "majority-element EASY array,hash-table,divide-and-conquer,sorting,counting"
    "excel-sheet-column-number EASY"
)

# Function to create problem directory and files
create_problem() {
    local number=$1
    local name=$2
    local difficulty=$3
    local tags=$4

    # Format the number to be 5 digits with leading zeros
    local formatted_number=$(printf "%05d" $number)

    # Create the directory
    local dir="problems/${formatted_number}-${name}"
    mkdir -p "$dir"

    # Create data.json file
    cat <<EOF > "${dir}/data.json"
{
    "id": "${name}",
    "title": "$(echo $name | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')",
    "difficulty": "${difficulty}",
    "tags": ["$(echo $tags | sed 's/,/","/g')"]
}
EOF

    # Create description.md file
    echo "# ${name}" > "${dir}/description.md"
}

# Loop through the problems array and create directories and files
for i in "${!problems[@]}"; do
    problem=(${problems[$i]})
    create_problem $((i + 1)) "${problem[0]}" "${problem[1]}" "${problem[2]}"
done