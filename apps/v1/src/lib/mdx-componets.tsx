import { cn } from "@/lib/utils"

/**
 * Override HTML elements and create own  MDX components
 */
export const mdxComponents = {
	h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
		<h1
			className={cn(
				"mt-2 scroll-m-28 font-bold font-heading text-3xl tracking-tight",
				className
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: React.ComponentProps<"h2">) => {
		return (
			<h2
				id={props.children
					?.toString()
					.replace(/ /g, "-")
					.replace(/'/g, "")
					.replace(/\?/g, "")
					.toLowerCase()}
				className={cn(
					"mt-10 scroll-m-28 font-heading font-medium text-xl tracking-tight first:mt-0 lg:mt-16 [&+.steps>h3]:mt-4! [&+.steps]:mt-0! [&+h3]:mt-6! [&+p]:mt-4! [&+]*:[code]:text-xl",
					className
				)}
				{...props}
			/>
		)
	},
	h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
		<h3
			className={cn(
				"mt-12 scroll-m-28 font-heading font-medium text-lg tracking-tight [&+p]:mt-4! [code]:*:text-xl",
				className
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
		<h4
			className={cn(
				"mt-8 scroll-m-28 font-heading font-medium text-base tracking-tight",
				className
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
		<h5
			className={cn("mt-8 scroll-m-28 font-medium text-base tracking-tight", className)}
			{...props}
		/>
	),
	h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
		<h6
			className={cn("mt-8 scroll-m-28 font-medium text-base tracking-tight", className)}
			{...props}
		/>
	),
	a: ({ className, ...props }: React.ComponentProps<"a">) => (
		<a className={cn("font-medium underline underline-offset-4", className)} {...props} />
	),
	p: ({ className, ...props }: React.ComponentProps<"p">) => (
		<p
			className={cn("not-first:mt-6 leading-relaxed", className)}
			{...props}
		/>
	),
	strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<strong className={cn("font-medium", className)} {...props} />
	),
	ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
		<ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
	),
	ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
		<ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
	),
	li: ({ className, ...props }: React.ComponentProps<"li">) => (
		<li className={cn("mt-2", className)} {...props} />
	),
	blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
		<blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props} />
	),
	img: ({ className, alt, ...props }: React.ComponentProps<"img">) => (
		<img className={cn("rounded-md", className)} alt={alt} {...props} />
	),
	hr: ({ ...props }: React.ComponentProps<"hr">) => (
		<hr className="my-4 md:my-8" {...props} />
	),
	table: ({ className, ...props }: React.ComponentProps<"table">) => (
		<div className="no-scrollbar my-6 w-full overflow-y-auto rounded-lg border">
			<table
				className={cn(
					"relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0",
					className
				)}
				{...props}
			/>
		</div>
	),
	tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
		<tr className={cn("m-0 border-b", className)} {...props} />
	),
	th: ({ className, ...props }: React.ComponentProps<"th">) => (
		<th
			className={cn(
				"px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right",
				className
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: React.ComponentProps<"td">) => (
		<td
			className={cn(
				"whitespace-nowrap px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right",
				className
			)}
			{...props}
		/>
	),
	pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
		return (
			<pre
				className={cn(
					"no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-hidden has-data-[slot=tabs]:p-0 has-data-highlighted-line:px-0 has-data-line-numbers:px-0",
					className
				)}
				{...props}
			>
				{children}
			</pre>
		)
	},
	figure: ({ className, ...props }: React.ComponentProps<"figure">) => {
		return <figure className={cn(className)} {...props} />
	},
	figcaption: ({ className, children, ...props }: React.ComponentProps<"figcaption">) => {
		return (
			<figcaption
				className={cn(
					"flex items-center gap-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70",
					className
				)}
				{...props}
			>
				{children}
			</figcaption>
		)
	},
	code: ({ className, ...props }: React.ComponentProps<"code">) => {
		return (
			<code
				className={cn(
					"relative rounded-lg border border-border bg-accent px-[0.3rem] py-[0.2rem] text-foreground dark:border-zinc-800 dark:bg-white/10",
					className
				)}
				{...props}
			/>
		)
	}
}
