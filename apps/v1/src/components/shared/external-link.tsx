export function ExternalLink({
	href,
	children,
	...props
}: React.ComponentProps<"a"> & {
	href: string
}) {
	return (
		<a
			href={href}
			className="font-medium underline underline-offset-4"
			target="_blank"
			rel="noreferrer"
			{...props}
		>
			{children}
		</a>
	)
}
