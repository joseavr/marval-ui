"use client"

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { LoaderIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
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
					"bg-primary-foreground text-primary hover:bg-[color-mix(in_srgb,var(--color-primary)_50%,var(--color-primary-foreground)_50%)]/20 active:bg-primary-foreground",
				"brand-tertiary":
					"bg-transparent text-primary hover:bg-primary-foreground active:bg-[color-mix(in_srgb,var(--color-primary)_50%,var(--color-primary-foreground)_50%)]/20",

				"brand-neutral-primary":
					"bg-secondary text-secondary-foreground hover:bg-secondary-foreground/10 active:bg-secondary",
				"brand-neutral-secondary":
					"border border-border bg-transparent text-secondary-foreground hover:bg-accent active:bg-transparent",
				"brand-neutral-tertiary":
					"bg-transparent text-secondary-foreground hover:bg-secondary active:bg-secondary-foreground/10",

				"brand-destructive-primary":
					"bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive",
				"brand-destructive-secondary":
					"bg-destructive-foreground text-destructive hover:bg-[color-mix(in_srgb,var(--color-destructive)_50%,var(--color-destructive-foreground)_50%)]/20 active:bg-destructive-foreground",
				"brand-destructive-tertiary":
					"bg-transparent text-destructive hover:bg-destructive-foreground active:bg-[color-mix(in_srgb,var(--color-destructive)_50%,var(--color-destructive-foreground)_50%)]/20"
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

export interface ButtonProps
	extends React.ComponentProps<"button">,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			loading = false,
			disabled = false,
			children,
			...props
		},
		ref
	) => {
		if (!asChild) {
			return (
				<button
					className={cn(buttonVariants({ variant, size, className }))}
					ref={ref}
					aria-disabled={disabled || loading}
					disabled={disabled || loading}
					{...props}
				>
					{loading && (
						<LoaderIcon role="status" aria-label="Loading" className="animate-spin" />
					)}
					{children}
				</button>
			)
		}
		return (
			<Slot
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{children}
			</Slot>
		)
	}
)
Button.displayName = "Button"

type ButtonVariantProps = VariantProps<typeof buttonVariants>
export { Button, buttonVariants, type ButtonVariantProps }
