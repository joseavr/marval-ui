import { cn } from "@/lib/utils"

type BaseLayoutProps = {
	children: React.ReactNode
	className?: string
}

export function BaseLayout({ children, className }: BaseLayoutProps) {
	return (
		<div
			id="layout"
			className={cn(
				"relative z-10 flex min-h-svh flex-col bg-background text-sm [scrollbar-gutter:stable]",
				className
			)}
		>
			{children}
		</div>
	)
}
