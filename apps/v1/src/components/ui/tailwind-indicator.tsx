import { cn } from "@/lib/utils"

type Props = {
	align?: "bottom-left" | "bottom-right"
}
export function TailwindIndicator({ align = "bottom-right" }: Props) {
	if (process.env.NODE_ENV === "production") return null

	return (
		<div
			className={cn(
				// base style
				"fixed z-50 flex h-6 w-6 items-center justify-center rounded-md bg-primary p-4 font-mono text-primary-foreground text-xs",
				// alignment style
				align === "bottom-right" && "right-5 bottom-5",
				align === "bottom-left" && "bottom-5 left-5"
			)}
		>
			<div className="block sm:hidden">xs</div>
			<div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">sm</div>
			<div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
			<div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
			<div className="hidden xl:block 2xl:hidden">xl</div>
			<div className="hidden 2xl:block">2xl</div>
		</div>
	)
}
