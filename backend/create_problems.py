import requests
import os
import json
import re

def convert_to_test_objects(metadata, tests):
    test_objects = []

    for test in tests:
        # Split the test string into individual arguments
        test_args = test.split('\n')
        
        # Initialize the args dictionary
        args = {}
        
        # Populate the args dictionary based on metadata
        for i, param in enumerate(metadata['params']):
            param_name = param['name']
            if param['type'] == 'string' and '"' not in test_args[i]:
                args[param_name] = test_args[i]
            else:
                args[param_name] = json.loads(test_args[i])
        
        # Create the test object
        test_object = {
            "args": args,
            "expected": None  # Placeholder for expected value
        }
        
        test_objects.append(test_object)
    
    return test_objects

def fetch_leetcode_questions():
    url = "https://leetcode.com/api/problems/all/"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        data = response.json()
        questions = data.get("stat_status_pairs", [])
        return questions
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return []

DIFF_LEVELS = ['', 'EASY', 'MEDIUM', 'HARD']

def fetch_question_details(title_slug):
    url = "https://leetcode.com/graphql/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:130.0) Gecko/20100101 Firefox/130.0",
        "content-type": "application/json",
    }
    query = """
    query questionContent($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            content
            mysqlSchemas
            dataSchemas
        }
    }
    """
    variables = {"titleSlug": title_slug}
    payload = {
        "query": query,
        "variables": variables,
        "operationName": "questionContent"
    }
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        data = response.json()
        return data.get("data", {}).get("question", {})
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching details for {title_slug}: {e}")
        return {}

def fetch_tests_metadata(title_slug):
    url = "https://leetcode.com/graphql/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:130.0) Gecko/20100101 Firefox/130.0",
        "content-type": "application/json",
    }
    query = """
    query consolePanelConfig($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            questionId
            questionFrontendId
            questionTitle
            enableDebugger
            enableRunCode
            enableSubmit
            enableTestMode
            exampleTestcaseList
            metaData
        }
    }
    """
    variables = {"titleSlug": title_slug}
    payload = {
        "query": query,
        "variables": variables,
        "operationName": "consolePanelConfig"
    }
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        data = response.json()
        return data.get("data", {}).get("question", {})
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching details for {title_slug}: {e}")
        return {}

def fetch_question_tags(title_slug):
    url = "https://leetcode.com/graphql/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:130.0) Gecko/20100101 Firefox/130.0",
        "content-type": "application/json",
    }
    query = """
    query singleQuestionTopicTags($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            topicTags {
                name
                slug
            }
        }
    }
    """
    variables = {"titleSlug": title_slug}
    payload = {
        "query": query,
        "variables": variables,
        "operationName": "singleQuestionTopicTags"
    }
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        data = response.json()
        return data.get("data", {}).get("question", {}).get("topicTags", [])
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching tags for {title_slug}: {e}")
        return []

def transform_type(param_type):
    array_match = re.match(r'list<(.+)>', param_type)
    if array_match:
        inner_type = array_match.group(1)
        return {
            "type": "array",
            "items": transform_type(inner_type)
        }
    elif param_type.endswith('[]'):
        # Handle nested arrays recursively
        inner_type = param_type[:-2]
        return {
            "type": "array",
            "items": transform_type(inner_type)
        }
    elif param_type == 'integer':
        return {"type": "int"}
    elif param_type == 'float':
        return {"type": "float"}
    elif param_type == 'double':
        return {"type": "float"}
    elif param_type == 'string':
        return {"type": "str"}
    elif param_type == 'boolean':
        return {"type": "bool"}
    elif param_type == 'character':
        return {"type": "str"}
    elif param_type == 'ListNode':
        return {"type": "ListNode"}
    elif param_type == 'TreeNode':
        return {"type": "TreeNode"}
    elif param_type == 'void':
        return {"type": "void"}
    else:
        print(param_type, "NOT FOUND")
        return {"type": param_type}

def transform_metadata_design(metadata):
    transformed_methods = []

    # Transform constructor
    constructor = metadata.get('constructor', {})
    constructor_params = constructor.get('params', [])
    const_args = []
    for param in constructor_params:
        new_param = {"name": param['name']}
        new_param.update(transform_type(param['type']))

        const_args.append(new_param)

    transformed_constructor = {
        "function": "__init__",
        "return": {"type": "void"},
        "args": const_args
    }
    transformed_methods.append(transformed_constructor)

    # Transform methods
    for method in metadata.get('methods', []):
        method_args = []
        for param in method.get('params', []):
            new_param = {"name": param['name']}
            new_param.update(transform_type(param['type']))

            method_args.append(new_param)

        transformed_method = {
            "function": method['name'],
            "return": transform_type(method['return']['type']),
            "args": method_args
        }
        transformed_methods.append(transformed_method)

    transformed_metadata = {
        "className": metadata['classname'],
        "methods": transformed_methods
    }

    return transformed_metadata

def transform_metadata(metadata):
    transformed_metadata = {
        "function": metadata['name'],
        "return": transform_type(metadata['return']['type']),
        "args": []
    }

    if 'output' in metadata:
        transformed_metadata['output'] = metadata["output"]['paramindex']

    for param in metadata['params']:
        tran = transform_type(param['type'])
        transformed_param = {
            "name": param['name'],
            "type": tran['type']
        }

        if "items" in tran:
            transformed_param['items'] = tran['items']

        transformed_metadata["args"].append(transformed_param)

    return transformed_metadata

def fetch_solution(problem_number):
    url = f"https://raw.githubusercontent.com/cnkyrpsgl/leetcode/refs/heads/master/solutions/python3/{problem_number}.py"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching the solution for problem {problem_number}: {e}")
        return None

# Example usage
if __name__ == "__main__":
    questions = fetch_leetcode_questions()[::-1]
    for question in questions:
        if question['stat']['question_id'] <= 145:
            continue

        # question_id, question__title, question__title_slug
        title_1 = str(question['stat']['question_id']).zfill(5)
        title_2 = question['stat']['question__title_slug']

        details_2 = fetch_tests_metadata(title_2)
        metadata = json.loads(details_2['metaData'])
        print(metadata)

        if "mysql" in metadata or "shell" in metadata:
            continue

        details = fetch_question_details(title_2)
        tags = list(map(lambda x: x['slug'], fetch_question_tags(title_2)))

        test_cases = details_2['exampleTestcaseList']
        print(test_cases)
        content_description = details['content'] or '# Premium-only question'

        # Make a folder for each question
        os.mkdir(f"./problems/{title_1}-{title_2}")

        real_tests = None
        question_type = "ALGO"
        if "classname" in metadata:
            question_type = "DESIGN"
            real_tests = []
        else:
            real_tests = convert_to_test_objects(metadata, test_cases) or []

        real_meta = None
        if "classname" in metadata:
            real_meta = transform_metadata_design(metadata)
        else:
            real_meta = transform_metadata(metadata)

        # # Create a file data.json
        data = {
            "id": title_2,
            "title": question['stat']['question__title'],
            "difficulty": DIFF_LEVELS[question['difficulty']['level']],
            "tags": tags,
            "metadata": real_meta,
            "type": question_type,
        }

        with open(f"./problems/{title_1}-{title_2}/data.json", "w") as f:
            f.write(json.dumps(data))
        
        with open(f"./problems/{title_1}-{title_2}/description.md", "w") as f:
            f.write(content_description)
        
        with open(f"./problems/{title_1}-{title_2}/tests.json", "w") as f:
            f.write(json.dumps(real_tests))
        
        with open(f"./problems/{title_1}-{title_2}/solution.py", "w") as f:
            f.write(fetch_solution(str(question['stat']['question_id'])) or 'print("hello world")')

    print(f"Fetched {len(questions)} questions from LeetCode.")