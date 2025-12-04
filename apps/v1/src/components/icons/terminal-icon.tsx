import type { SVGProps } from "react"

export function TerminalIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			className={className}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Terminal Icon</title>
			<rect
				x="3"
				y="3"
				width="18"
				height="18"
				rx="3"
				stroke="#000000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></rect>
			<path
				d="M6.99997 8.50003L10.8639 12.1821L6.99994 15.5"
				stroke="#000000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
			<path
				d="M12 16H17"
				stroke="#000000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			></path>
		</svg>
	)
}
