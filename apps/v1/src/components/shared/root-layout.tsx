import { cn } from "@/lib/utils"

type BaseLayoutProps = {
	children: React.ReactNode
	className?: string
}

export function RootLayout({ children, className }: BaseLayoutProps) {
	return (
		<div
			data-id="page-layout"
			className={cn(
				"relative z-10 flex min-h-svh flex-col bg-background text-[15px] leading-(--text-sm--line-height)[scrollbar-gutter:stable]",
				className
			)}
		>
			{children}
		</div>
	)
}
