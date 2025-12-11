"use client"

import { ArrowUpIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

export function ButtonDemo() {
	const [value, setValue] = useState(0)

	return (
		<div className="flex flex-wrap items-center gap-2 md:flex-row">
			<Button variant="outline">Button {value}</Button>
			<Button
				variant="outline"
				size="icon"
				aria-label="Submit"
				onClick={() => setValue((prev) => prev + 1)}
			>
				<ArrowUpIcon />
			</Button>
		</div>
	)
}
