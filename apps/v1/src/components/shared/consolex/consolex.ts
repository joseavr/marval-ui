"use client"

import { preview } from "./serialize"
import { getComponentFromStack, getStack } from "./stacktrace"
import { store } from "./store"

export function consolex(data: unknown, options?: { label?: string }) {
	if (process.env.NODE_ENV !== "development") return
	if (typeof window === "undefined") return

	store.push({
		time: Date.now(),
		label: options?.label,
		data,
		preview: preview(data),
		stack: getStack(),
		// TODO
		component: getComponentFromStack()
	})
}
