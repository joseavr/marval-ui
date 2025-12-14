"use client"

import { ArrowUpIcon } from "lucide-react"
import { useState } from "react"

import { useComponentPreviewDemoContext } from "@/components/shared/component-preview"
import { Button, type ButtonVariantProps } from "@/registry/button"

export function ButtonDemo() {
	const [value, setValue] = useState(0)
	const { state } = useComponentPreviewDemoContext()

	return (
		<div className="flex flex-wrap items-center gap-2 md:flex-row">
			<Button
				loading={state.loading as boolean}
				disabled={state.disabled as boolean}
				variant={state.variant as ButtonVariantProps["variant"]}
				size={state.size as ButtonVariantProps["size"]}
			>
				Button {value}
			</Button>
			<Button
				disabled={state.disabled as boolean}
				variant={state.variant as ButtonVariantProps["variant"]}
				size={state.size as ButtonVariantProps["size"]}
				onClick={() => setValue((prev) => prev + 1)}
			>
				<ArrowUpIcon />
			</Button>
		</div>
	)
}
