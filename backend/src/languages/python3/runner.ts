import { MetadataAlgo, T } from '../common/snippets';
import { v4 } from 'uuid';
export class Python3Runner {
    public addAlgoCode(s: string, metadata: MetadataAlgo) {
        const makeArg = (i: number, arg: T) =>
            `arg_${i + 1} = deserialize(data['${arg.name}'], ${JSON.stringify(arg.serialize())})`;

        const separator = '===' + v4() + '===';
        const code = `
from typing import *
from string import *
from re import *
from datetime import *
from collections import *
from heapq import *
from bisect import *
from copy import *
from math import *
from random import *
from statistics import *
from itertools import *
from functools import *
from operator import *
from io import *
from sys import *
from json import *
from builtins import *

import string
import re
import datetime
import collections
import heapq
import bisect
import copy
import math
import random
import statistics
import itertools
import functools
import operator
import io
import sys
import json

from yeetcode.listnode import ListNode
from yeetcode.treenode import TreeNode
from yeetcode.util import serialize, deserialize

${s}

with open('user.out', 'w') as f:
\tfor i, data in enumerate(map(json.loads, sys.stdin)):

${metadata.args.map((arg, i) => `\t\t` + makeArg(i, arg)).join('\n')}

\t\tresult = Solution().${metadata.function}(${metadata.args.map((_, i) => `arg_${i + 1}`).join(', ')})
\t\tresult = serialize(${metadata.output !== undefined ? 'arg_' + (metadata.output + 1) : 'result'}, ${JSON.stringify(metadata.return.serialize())})
\t\tprint("${separator}")
\t\tresult_str = json.dumps(result,separators=(',', ':'))
\t\tprint(result_str, file=f)

with open('user.out', 'r') as f:
\tprint(f.read())
`;
        return [code, separator];
    }
}
