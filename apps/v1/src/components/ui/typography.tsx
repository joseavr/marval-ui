import { cn } from "@/lib/utils"

interface typographyProps {
	as: "h1" | "h2" | "h3" | "p"
	variant: keyof typeof variants
	className?: string
	children?: React.ReactNode
}

const variants = {
	"display-6xl":
		"text-4xl leading-tight tracking-tight sm:text-7xl md:text-9xl lg:text-[12rem]",
	"display-5xl":
		"text-4xl leading-tight tracking-tight sm:text-7xl md:text-8xl lg:text-[10rem]",
	"display-4xl":
		"text-4xl leading-tight tracking-tight sm:text-7xl md:text-8xl lg:text-9xl",
	"display-3xl":
		"text-4xl leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl",
	"display-2xlL":
		"text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
	"display-xl":
		"text-3xl leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl",
	"display-lg":
		"text-2xl leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl",
	"display-md":
		"text-xl leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl",
	"display-sm": "text-lg leading-tight sm:text-xl md:text-2xl lg:text-3xl",
	"display-xs": "text-base leading-tight sm:text-lg md:text-xl lg:text-2xl",
	"text-xl": "text-lg leading-normal sm:text-xl md:text-2xl",
	"text-lg": "text-base leading-normal sm:text-lg md:text-xl",
	"text-base": "text-base leading-normal",
	"text-md": "text-base  leading-normal ",
	"text-sm": "text-sm leading-normal ",
	"text-xs": "text-xs leading-normal ",

	"display": "",
	"headline": "",
	"title": "",
	"body": "",
	"body-secondary":"",
	"label": "",

	"text-heading-lg": cn("font-bold text-base text-foreground"),
	"text-heading-base": cn("font-bold text-foreground text-sm"),
	"text-body-base": cn("font-normal text-foreground text-sm"),
	"text-secondary-base": cn("font-normal text-muted-foreground text-sm"),
	"text-secondary-md": cn("font-normal text-muted-foreground text-xs")
}

export function Typography({ as: As, variant, children, className }: typographyProps) {
	const baseStyles = variants[variant]

	return <As className={cn(baseStyles, className)}>{children}</As>
}
