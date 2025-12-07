"use client"

import { Check, Copy06 } from "@untitledui/icons"
import { VariantProps } from "class-variance-authority"
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState
} from "react"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ClipboardContextType {
	handleCopyClipboard: () => Promise<void>
	onCopy: boolean
	setOnCopy: Dispatch<SetStateAction<boolean>>
	onDone: boolean
	setOnDone: Dispatch<SetStateAction<boolean>>
}

const ClipboardButtonContext = createContext<ClipboardContextType | undefined>(undefined)

function useClipboardButtonContext() {
	const context = useContext(ClipboardButtonContext)
	if (!context)
		throw new Error("useCopyButtonContext must be used within <ClipboardButton>.")

	return context
}

type Toaster = { message: string }

interface ClipboardButtonRootProps extends VariantProps<typeof buttonVariants> {
	textToCopy: string
	className?: string
	animationDuration?: number
	toaster?: Toaster
	children?: React.ReactNode
}

function ClipboardButtonRoot({
	textToCopy,
	className,
	animationDuration = 2000,
	toaster,
	children,
	variant,
	size
}: ClipboardButtonRootProps) {
	const { isCopied, handleCopyClipboard, onCopy, setOnCopy, onDone, setOnDone } =
		useClipboard(textToCopy, animationDuration, toaster)

	return (
		<ClipboardButtonContext
			value={{ handleCopyClipboard, onCopy, setOnCopy, onDone, setOnDone }}
		>
			<Button
				type="button"
				disabled={isCopied}
				onClick={isCopied ? undefined : handleCopyClipboard}
				className={cn(
					"transition-all relative rounded-md disabled:opacity-80",
					className
				)}
				variant={variant}
				size={size}
			>
				{children}
			</Button>
		</ClipboardButtonContext>
	)
}

function ClipboardIcon({
	className,
	copyIcon,
	successIcon
}: {
	className?: string
	copyIcon?: React.ReactElement<SVGSVGElement>
	successIcon?: React.ReactElement<SVGSVGElement>
}) {
	const { onCopy, setOnCopy, onDone, setOnDone } = useClipboardButtonContext()

	const CopyIcon = copyIcon ? (
		React.cloneElement(copyIcon, {
			className: cn(
				copyIcon.props.className,
				"transition-all",
				onCopy ? "scale-0" : "scale-100"
			),
			ontransitionend: () => {
				if (onCopy) {
					setOnDone(true)
				}
			}
		})
	) : (
		<Copy06
			className={cn("size-4 transition-all", onCopy ? "scale-0" : "scale-100", className)}
			onTransitionEnd={() => {
				if (onCopy) {
					setOnDone(true)
				}
			}}
		/>
	)

	const SuccessIcon = successIcon ? (
		React.cloneElement(successIcon, {
			className: cn(
				successIcon.props.className,
				"transition-all",
				onDone ? "scale-100" : "scale-0"
			),
			ontransitionend: () => {
				setTimeout(() => {
					setOnCopy(false)
					setOnDone(false)
				}, 2000)
			}
		})
	) : (
		<Check
			className={cn("size-4 transition-all", onDone ? "scale-100" : "scale-0", className)}
			onTransitionEnd={() => {
				setTimeout(() => {
					setOnCopy(false)
					setOnDone(false)
				}, 2000)
			}}
		/>
	)

	return (
		<>
			<div className="absolute inset-0 flex items-center justify-center">{CopyIcon}</div>
			<div className="absolute inset-0 flex items-center justify-center">
				{SuccessIcon}
			</div>
		</>
	)
}

function useClipboard(text: string, animationDuration: number, toaster?: Toaster) {
	const [isCopied, setIsCopied] = useState(false)
	const [onCopy, setOnCopy] = useState(false)
	const [onDone, setOnDone] = useState(false)

	const handleCopyClipboard = async () => {
		setIsCopied(true)
		setOnCopy(true)
		await navigator.clipboard.writeText(text)
		toaster &&
			toast.success("Copied to clipboard:", {
				description: text,
				duration: 2000
			})
		setTimeout(() => {
			setIsCopied(false)
		}, animationDuration)
	}
	return { isCopied, handleCopyClipboard, onCopy, setOnCopy, onDone, setOnDone }
}

export { ClipboardButtonRoot as ClipboardButton, ClipboardIcon }
