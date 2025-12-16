export function ExternalLink({
	href,
	children,
	...props
}: React.ComponentProps<"a"> & {
	href: string
}) {
	return (
		<a href={href} target="_blank" rel="noreferrer" {...props}>
			{children}
		</a>
	)
}
