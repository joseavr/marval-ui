"use client"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const codeVariants = cva(
	"relative rounded-lg px-[0.3rem] py-[0.2rem] align-middle text-xs leading-6",
	{
		variants: {
			variant: {
				default: "bg-accent text-foreground dark:border-zinc-800 dark:bg-white/10",
				prop: "bg-primary-foreground text-primary dark:bg-primary/20 dark:text-blue-500",
				function: "bg-destructive-foreground text-destructive",
				variable: "text-[#005CC5] dark:text-[#79B8FF]"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
)

export interface CodeProps
	extends React.ComponentProps<"code">,
		VariantProps<typeof codeVariants> {}

export function Code({ className, children, variant }: CodeProps) {
	return <code className={cn(codeVariants({ variant, className }))}>{children}</code>
}
