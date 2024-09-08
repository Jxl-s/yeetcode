const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from 'public' folder

const judge0Url =
    "http://localhost:2358/submissions?base64_encoded=false&wait=true";

// Serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", async (req, res) => {
    const { language, code } = req.body;

    // Map language to Judge0 language ID
    const languageId =
        language === "python3" ? 34 : language === "cpp14" ? 45 : 0;

    // Prepare request body for Judge0
    const requestBody = {
        source_code: code,
        language_id: languageId,
        stdin: "",
        expected_output: "",
    };

    try {
        const response = await axios.post(judge0Url, requestBody, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        res.json({
            output: response.data.stdout || response.data.stderr || "No output",
        });
    } catch (error) {
        res.status(500).json({ output: "Error communicating with Judge0" });
    }
});

// Endpoint to run test cases
app.get("/run-tests", async (req, res) => {
    const testCases = [
        {
            input: "nums = [2, 7, 11, 15]; target = 9",
            output: "Indices: [0, 1]",
        },
        {
            input: "nums = [3, 2, 4]; target = 6",
            output: "Indices: [1, 2]",
        },
        {
            input: "nums = [3, 3]; target = 6",
            output: "Indices: [0, 1]",
        },
    ];

    const results = await Promise.all(
        testCases.map(async (testCase) => {
            const code = `
def twoSum(nums, target):
    num_dict = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_dict:
            return [num_dict[complement], i]
        num_dict[num] = i
    return []

print(twoSum(${testCase.input}))`;

            const requestBody = {
                source_code: code,
                language_id: 34, // Python 3
                stdin: "",
                expected_output: testCase.output,
            };

            try {
                const response = await axios.post(judge0Url, requestBody, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                return {
                    input: testCase.input,
                    output:
                        response.data.stdout ||
                        response.data.stderr ||
                        "No output",
                };
            } catch (error) {
                return {
                    input: testCase.input,
                    output: "Error communicating with Judge0",
                };
            }
        })
    );

    res.json(results);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
