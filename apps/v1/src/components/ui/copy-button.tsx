"use client"

import { Check, Copy06 } from "@untitledui/icons"
import { createContext, useContext, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ClipboardContextType {
	isCopied: boolean
	handleCopy: () => void
}

const CopyButtonContext = createContext<ClipboardContextType | undefined>(undefined)

type Toaster = { message: string }

interface ClipboardButtonRootProps {
	text: string
	className?: string
	transitionDuration?: number
	toaster?: Toaster
	children?: React.ReactNode
}

function ClipboardButtonRoot({
	text,
	className,
	transitionDuration = 2000,
	toaster,
	children
}: ClipboardButtonRootProps) {
	const { isCopied, handleCopy } = useClipboard(text, transitionDuration, toaster)

	return (
		<CopyButtonContext value={{ isCopied, handleCopy }}>
			<Button
				type="button"
				disabled={isCopied}
				onClick={isCopied ? undefined : handleCopy}
				className={cn("rounded-md transition disabled:opacity-80", className)}
			>
				{children}
			</Button>
		</CopyButtonContext>
	)
}

function ClipboardIcon({
	className,
	copyIcon,
	successIcon
}: {
	className: string
	copyIcon?: React.ReactElement
	successIcon?: React.ReactElement
}) {
	const CopyIcon = copyIcon ?? <Copy06 className={cn("size-4", className)} />
	const SuccessIcon = successIcon ?? <Check className={cn("size-4", className)} />
	const { isCopied } = useCopyButtonContext()
	return isCopied ? SuccessIcon : CopyIcon
}

function useCopyButtonContext() {
	const context = useContext(CopyButtonContext)
	if (!context)
		throw new Error("useCopyButtonContext must be used within CopyButton component.")

	return context
}

function useClipboard(text: string, transitionDuration: number, toaster?: Toaster) {
	const [isCopied, setIsCopied] = useState(false)

	const handleCopy = async () => {
		setIsCopied(true)
		await navigator.clipboard.writeText(text)
		toaster && toast.success("Copied to clipboard")

		setTimeout(() => {
			setIsCopied(false)
		}, transitionDuration)
	}

	return { isCopied, handleCopy }
}

export { ClipboardButtonRoot as ClipboardButton, ClipboardIcon }
