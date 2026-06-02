package judge

import (
	"strings"
)

// EvaluateVerdict compares the actual stdout against the expected output
// and returns the final submission status
func EvaluateVerdict(actualOutput, expectedOutput string, timeExceeded bool, stderr string) string {
	if timeExceeded {
		return "TIME_LIMIT_EXCEEDED"
	}

	if stderr != "" {
		return "RUNTIME_ERROR"
	}

	// Normalize whitespace for fair comparison
	// (Trim leading/trailing spaces and newlines)
	cleanActual := strings.TrimSpace(actualOutput)
	cleanExpected := strings.TrimSpace(expectedOutput)

	if cleanActual == cleanExpected {
		return "ACCEPTED"
	}

	return "WRONG_ANSWER"
}
