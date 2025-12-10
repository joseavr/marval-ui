"use client"

import { Copy01 } from "@untitledui/icons"

import { ClipboardButton, ClipboardIcon } from "@/components/ui/clipboard-button"

interface CopyMarkdownButtonProps {
	text: string
	/** animationDuration in miliseconds */
	animationDuration?: number
}

export function CopyMarkdownButton({ animationDuration = 2000, text }: CopyMarkdownButtonProps) {
	return (
		<ClipboardButton
			variant="outline"
			size="sm"
			className="flex gap-2 border-none bg-secondary shadow-none"
			textToCopy={text}
			animationDuration={animationDuration}
		>
			<div className="relative size-3.5">
				<ClipboardIcon copyIcon={<Copy01 />} />
			</div>
			<span>Copy Markdown</span>
		</ClipboardButton>
	)
}
