"use client"

import { Check, Copy06 as Copy } from "@untitledui/icons"
import { cva, type VariantProps } from "class-variance-authority"
import React, {
	createContext,
	type Dispatch,
	type ReactElement,
	type SetStateAction,
	type SVGProps,
	useContext,
	useState
} from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/button"

const copyButtonVariants = cva(
	"inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 mobile:active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
				outline:
					"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",

				"brand-primary":
					"bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary",
				"brand-secondary":
					"bg-primary-foreground text-primary hover:bg-[color-mix(in_oklab,var(--color-primary)_50%,var(--color-primary-foreground)_50%)]/20 active:bg-primary-foreground dark:bg-[color-mix(in_oklab,var(--color-primary)_80%,var(--color-primary-foreground)_20%)]/20 dark:active:bg-[color-mix(in_oklab,var(--color-primary)_80%,var(--color-primary-foreground)_20%)]/20 dark:hover:bg-[color-mix(in_oklab,var(--color-primary)_80%,var(--color-primary-foreground)_20%)]/30",
				"brand-tertiary":
					"bg-transparent text-primary hover:bg-primary-foreground active:bg-[color-mix(in_oklab,var(--color-primary)_50%,var(--color-primary-foreground)_50%)]/20 dark:active:bg-[color-mix(in_oklab,var(--color-primary)_80%,var(--color-primary-foreground)_20%)]/30 dark:hover:bg-[color-mix(in_oklab,var(--color-primary)_80%,var(--color-primary-foreground)_20%)]/20",

				"brand-neutral-primary":
					"bg-secondary text-secondary-foreground hover:bg-secondary-foreground/10 active:bg-secondary",
				"brand-neutral-secondary":
					"border border-border bg-transparent text-secondary-foreground hover:bg-accent active:bg-transparent",
				"brand-neutral-tertiary":
					"bg-transparent text-secondary-foreground hover:bg-secondary active:bg-secondary-foreground/10",

				"brand-destructive-primary":
					"bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive dark:bg-[color-mix(in_oklab,var(--color-destructive)_60%,var(--color-destructive-foreground)_100%)] dark:text-white",
				"brand-destructive-secondary":
					"bg-destructive-foreground text-destructive hover:bg-[color-mix(in_oklab,var(--color-destructive)_50%,var(--color-destructive-foreground)_50%)]/20 active:bg-destructive-foreground dark:bg-[color-mix(in_oklab,var(--color-destructive)_20%,var(--color-destructive-foreground)_80%)]/20 dark:active:bg-[color-mix(in_oklab,var(--color-destructive)_20%,var(--color-destructive-foreground)_80%)]/20 dark:hover:bg-[color-mix(in_oklab,var(--color-destructive)_20%,var(--color-destructive-foreground)_80%)]/30",
				"brand-destructive-tertiary":
					"bg-transparent text-destructive hover:bg-destructive-foreground active:bg-[color-mix(in_oklab,var(--color-destructive)_50%,var(--color-destructive-foreground)_50%)]/20 dark:active:bg-[color-mix(in_oklab,var(--color-destructive)_20%,var(--color-destructive-foreground)_80%)]/30 dark:hover:bg-[color-mix(in_oklab,var(--color-destructive)_20%,var(--color-destructive-foreground)_80%)]/20"
			},
			size: {
				sm: "h-7 gap-1.5 px-3 text-xs has-[>svg]:px-2.5 [&_svg]:size-3.5!",
				default: "h-8 px-4 py-2 has-[>svg]:px-3",
				lg: "h-9 px-6 has-[>svg]:px-4",
				"icon-sm": "size-7 [&_svg]:size-3.5!",
				icon: "size-8 [&_svg]:size-4!",
				"icon-lg": "size-9 [&_svg]:size-4!"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
)
type CopyButtonVariantProps = VariantProps<typeof copyButtonVariants>

interface CopyButtonContextType {
	onCopy: boolean
	setOnCopy: Dispatch<SetStateAction<boolean>>
	onDone: boolean
	setOnDone: Dispatch<SetStateAction<boolean>>
	animationDuration: number
}

const CopyButtonContext = createContext<CopyButtonContextType | undefined>(undefined)

function useCopyButtonContext() {
	const context = useContext(CopyButtonContext)
	if (!context)
		throw new Error("useCopyButtonContext must be used within <ClipboardButton>.")
	return context
}

type Toaster = { title?: string; duration?: number; description?: string }

/**
 * Props for the root `CopyButton` component.
 */
interface CopyButtonProps extends VariantProps<typeof copyButtonVariants> {
	/** Text value that will be copied to the clipboard when the button is pressed. */
	textToCopy: string

	/** Additional CSS class names to merge with the default button styles. */
	className?: string

	/** Duration in milliseconds (ms) for the copy animation. */
	animationDuration?: number

	/** Configuration for the copy success toast notification. */
	toasterOptions?: Toaster

	/** React children rendered inside the button. Can render with pre-built icon <ClipboardIcon />. */
	children?: React.ReactNode
}

function CopyButton({
	textToCopy,
	className,
	animationDuration = 2000,
	toasterOptions,
	children,
	variant,
	size
}: CopyButtonProps) {
	const { copyToClipboard, onCopy, setOnCopy, onDone, setOnDone } = useClipboard()

	const handleCopyToClipboard = async () => {
		await copyToClipboard(textToCopy)
		if (toasterOptions) {
			const toast = (await import("sonner")).toast
			toast.success(toasterOptions.title ?? "", {
				description: toasterOptions.description ?? undefined,
				duration: toasterOptions.duration ?? 2000
			})
		}
	}

	return (
		<CopyButtonContext
			value={{ onCopy, setOnCopy, onDone, setOnDone, animationDuration }}
		>
			<Button
				type="button"
				disabled={onCopy}
				onClick={onCopy ? undefined : handleCopyToClipboard}
				className={cn(
					"relative rounded-md transition-all disabled:opacity-80",
					className
				)}
				variant={variant}
				size={size}
			>
				{React.Children.map(children, (child) => {
					// iterate over children to fix ClipboardIcon styles since it uses `absolute` and needs a `relative` parent
					if (
						React.isValidElement(child) &&
						child.type === ClipboardIcon &&
						React.Children.count(children) >= 2
					) {
						return <div className="relative size-4">{child}</div>
					}

					return child
				})}
			</Button>
		</CopyButtonContext>
	)
}

/**
 * Props for the `ClipboardIcon` component
 */
interface ClipboardIconProps {
	className?: string
	/** Custom SVG element to display when the button is in idle state. */
	idleIcon?: ReactElement<SVGProps<SVGSVGElement>>
	/** Custom SVG element to display when the copy action is completed. */
	copiedIcon?: ReactElement<SVGProps<SVGSVGElement>>
}
function ClipboardIcon({ className, idleIcon, copiedIcon }: ClipboardIconProps) {
	const { onCopy, setOnCopy, onDone, setOnDone, animationDuration } =
		useCopyButtonContext()

	const CopyIcon = idleIcon ? (
		React.cloneElement(idleIcon, {
			className: cn(
				idleIcon.props.className,
				"transition-all",
				onCopy ? "scale-0" : "scale-100"
			),
			onTransitionEnd: () => {
				if (onCopy) {
					setOnDone(true)
				}
			}
		})
	) : (
		<Copy
			className={cn("size-4 transition-all", onCopy ? "scale-0" : "scale-100", className)}
			onTransitionEnd={() => {
				if (onCopy) {
					setOnDone(true)
				}
			}}
		/>
	)

	const SuccessIcon = copiedIcon ? (
		React.cloneElement(copiedIcon, {
			className: cn(
				copiedIcon.props.className,
				"transition-all",
				onDone ? "scale-100" : "scale-0"
			),
			onTransitionEnd: () => {
				if (onDone) {
					setTimeout(() => {
						setOnDone(false)
						setOnCopy(false)
					}, animationDuration)
				}
			}
		})
	) : (
		<Check
			className={cn("size-4 transition-all", onDone ? "scale-100" : "scale-0", className)}
			onTransitionEnd={() => {
				setTimeout(() => {
					setOnCopy(false)
					setOnDone(false)
				}, animationDuration)
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

function useClipboard() {
	const [onCopy, setOnCopy] = useState(false)
	const [onDone, setOnDone] = useState(false)

	const handleCopyClipboard = async (text: string) => {
		setOnCopy(true)
		await navigator.clipboard.writeText(text)
	}
	return {
		copyToClipboard: handleCopyClipboard,
		onCopy,
		setOnCopy,
		onDone,
		setOnDone
	}
}

export { CopyButton, ClipboardIcon, type CopyButtonVariantProps }
