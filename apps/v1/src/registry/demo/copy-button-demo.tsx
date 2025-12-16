"use client"

import { useComponentPreviewDemoContext } from "@/components/shared/component-preview"
import {
	ClipboardIcon,
	CopyButton,
	type CopyButtonVariantProps
} from "@/registry/copy-button"

export function CopyButtonDemo() {
	const { state } = useComponentPreviewDemoContext()
	return (
		<div className="flex flex-wrap items-center gap-2 md:flex-row">
			<CopyButton
				textToCopy={state.text as string}
				animationDuration={state.animationDuration as number}
				size={state.size as CopyButtonVariantProps["size"]}
				variant={state.variant as CopyButtonVariantProps["variant"]}
				toasterOptions={{
					title: "Copied to the clipboard:",
					description: state.textToCopy as string
				}}
			>
				<ClipboardIcon />
			</CopyButton>
		</div>
	)
}
