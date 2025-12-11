import { DistributeSpacingHorizontal } from "@untitledui/icons"
import type { SVGProps } from "react"

export function LayoutFullIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			className={className}
			aria-hidden="true"
			fill="none"
			width="24"
			height="24"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M2 3v18" />
			<rect height="18" rx="2" width="12" x="6" y="3" />
			<path d="M22 3v18" />
		</svg>
	)
}

export function LayoutZenIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return <DistributeSpacingHorizontal className={className} {...props} />
}
