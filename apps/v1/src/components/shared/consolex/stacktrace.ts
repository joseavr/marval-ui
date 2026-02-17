
export function getStack(): string | undefined {
	const err = new Error()

	if (!err.stack) return

	return err.stack.split("\n").slice(3, 8).join("\n")
}

export function getComponentFromStack(): string | undefined {
	const err = new Error()
	if (!err.stack) return

	const trace = err.stack.split("\n").map((line) => line.trim())

	// Find first line containing 'consolex'
	const consolexIndex = trace.findIndex((line) => line.includes("consolex"))
	if (consolexIndex === -1) return

	// The next line is the caller of consolex
	const targetLine = trace[consolexIndex + 1]
	if (!targetLine) return

	// Optional function name
	const fnMatch = targetLine.match(/^at\s+(\w+)\s+\(/)
	const fnName = fnMatch ? fnMatch[1] : undefined

	// Extract the id=... part
	const idMatch = targetLine.match(/id=([^:\s]+)/)
	if (!idMatch) return

	// URL-decode
	const decoded = decodeURIComponent(idMatch[1])

	// Extract the last path segment with the desired extensions
	const fileMatch = decoded.match(/([^/\\]+\.(ts|tsx|css|jsx|mjs))$/)

	if (!fileMatch) return

	const fileName = fileMatch[1]

	return fnName ? `${fileName}:${fnName}` : fileName
}
