import { cn } from "@/lib/utils"

type ContainerProps = {
	children: React.ReactNode
	className?: string
}

export function Container({ children, className }: ContainerProps) {
	return (
		<div
			data-id="page-container"
			className={cn("3xl:mx-auto w-full 3xl:max-w-screen-2xl 3xl:px-0 px-6", className)}
		>
			{children}
		</div>
	)
}
