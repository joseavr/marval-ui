import { InfoCircle } from "@untitledui/icons"

import { DEVICONS } from "@/components/icons/language-icons"
import { ClipboardButton, ClipboardIcon } from "@/components/shared/clipboard-button"
import { ComponentPreview } from "@/components/shared/component-preview"
import { Button } from "@/components/ui/button"
import {
	CodeBlock,
	CodeBlockContentWithExpand,
	CodeBlockExpandTrigger,
	CodeBlockHeader,
	CodeBlockHeaderItem,
	CodeBlockTabs,
	CodeBlockTabsContent,
	CodeBlockTabsTrigger
} from "@/components/ui/codeblock"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ButtonDemo } from "@/registry/demo/button-demo"

const defaultMdxComponents = {
	h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
		<h1
			className={cn("mt-2 scroll-m-28 font-bold text-4xl tracking-tight", className)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: React.ComponentProps<"h2">) => {
		return (
			<h2
				className={cn(
					"mt-10 scroll-m-28 font-medium text-2xl tracking-tight first:mt-0 lg:mt-16",
					"[&+.steps>h3]:mt-4! [&+.steps]:mt-0! [&+h3]:mt-6! [&+p]:mt-4! [&+]*:[code]:text-2xl",
					className
				)}
				{...props}
			/>
		)
	},
	h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
		<h3
			className={cn(
				"mt-12 scroll-m-28 font-medium text-xl tracking-tight",
				"[&+p]:mt-4! [code]:*:text-xl",
				className
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
		<h4
			className={cn("mt-8 scroll-m-28 font-medium text-base tracking-tight", className)}
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
		<a
			className={cn("font-medium underline underline-offset-4", className)}
			target="_blank"
			{...props}
		/>
	),
	strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<strong className={cn("font-medium", className)} {...props} />
	),
	p: ({ className, ...props }: React.ComponentProps<"p">) => (
		<p className={cn("not-first:mt-6 leading-relaxed", className)} {...props} />
	),
	ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
		<ul className={cn("my-6 mt-4 ml-6 list-disc", className)} {...props} />
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
	// TODO
	table: ({ className, ...props }: React.ComponentProps<"table">) => (
		<div className="no-scrollbar my-6 w-full overflow-y-auto rounded-lg border">
			<table
				className={cn(
					"relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0 [&_thead_tr]:bg-accent [&_thead_tr_th:nth-child(2)]:max-w-[60%]",
					className
				)}
				{...props}
			/>
		</div>
	),
	tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
		<tr
			className={cn(
				"[&_td:nth-child(2)]:whitespace-normal! m-0 border-b transition-colors hover:bg-accent",
				className
			)}
			{...props}
		/>
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
	td: ({ className, children, ...props }: React.ComponentProps<"td">) => (
		<td
			className={cn(
				"whitespace-nowrap px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right",
				className
			)}
			{...props}
		>
			{children}
		</td>
	),
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
	}
}

const demoComponents = {
	ButtonDemo: ButtonDemo
}

/**
 * Custom MDX components, ready to use in .mdx files
 */
export const mdxComponents = {
	...defaultMdxComponents,
	...demoComponents,
	figure: ({
		className,
		__language__,
		__filepath__,
		__raw__,
		__showHeader__,
		__showExpand__,
		children,
		...props
	}: React.ComponentProps<"figure"> & {
		__language__: string
		__filepath__: string
		__raw__: string
		__showHeader__: boolean
		__showExpand__: boolean
	}) => {
		const Icon = DEVICONS[__language__]
		const isInstallation = __raw__.startsWith("npm") || __raw__.startsWith("npx")
		return (
			<CodeBlock
				language={__language__}
				filepath={__filepath__}
				showHeader={__showHeader__}
				raw={__raw__}
				{...props}
			>
				<CodeBlockHeader>
					{__showHeader__ && (
						<CodeBlockHeaderItem align="left">
							{Icon && <Icon className="inline-flex size-4" />}
							{__filepath__ && (
								<span className="font-geist-sans text-foreground text-sm dark:text-muted-foreground">
									{__filepath__}
								</span>
							)}
							{isInstallation && (
								<CodeBlockTabs>
									<CodeBlockTabsTrigger>pnpm</CodeBlockTabsTrigger>
									<CodeBlockTabsTrigger>npm</CodeBlockTabsTrigger>
									<CodeBlockTabsTrigger>yarn</CodeBlockTabsTrigger>
									<CodeBlockTabsTrigger>bun</CodeBlockTabsTrigger>
								</CodeBlockTabs>
							)}
						</CodeBlockHeaderItem>
					)}

					<CodeBlockHeaderItem align="right">
						{__showExpand__ && <CodeBlockExpandTrigger position="inline" />}
						<ClipboardButton textToCopy={__raw__} variant="outline" size="icon-sm">
							<ClipboardIcon />
						</ClipboardButton>
					</CodeBlockHeaderItem>
				</CodeBlockHeader>

				{__showExpand__ ? (
					<CodeBlockContentWithExpand>{children}</CodeBlockContentWithExpand>
				) : (
					children
				)}
			</CodeBlock>
		)
	},
	pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
		return (
			<pre className={className} {...props}>
				{children}
			</pre>
		)
	},
	code: ({
		className,
		__npm__,
		__pnpm__,
		__bun__,
		__yarn__,
		children,
		...props
	}: React.ComponentProps<"code"> & {
		"data-language": string
		__npm__?: string
		__pnpm__?: string
		__yarn__?: string
		__bun__?: string
	}) => {
		const isCodeBlock = !!props?.["data-language"]
		const isInstallationCodeBlock = Boolean(__npm__)
		return (
			<code
				className={cn(
					isCodeBlock
						? "wrap-break-word relative grid min-w-full overflow-x-auto rounded-lg border-0 bg-transparent py-3 pt-3 font-mono text-sm [scrollbar-width:none]"
						: "relative rounded-lg border border-border bg-accent px-[0.3rem] py-[0.2rem] align-middle text-foreground leading-6 dark:border-zinc-800 dark:bg-white/10",
					isInstallationCodeBlock && "select-all pt-1",
					className
				)}
				{...props}
			>
				{isInstallationCodeBlock ? (
					<CodeBlockTabsContent
						// biome-ignore lint/style/noNonNullAssertion: at this point, all of them exist
						values={{ pnpm: __pnpm__!, npm: __npm__!, yarn: __yarn__!, bun: __bun__! }}
					/>
				) : (
					children
				)}
			</code>
		)
	},
	Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
		<h3
			className={cn(
				"mt-8 scroll-m-20 font-heading font-semibold text-xl tracking-tight",
				className
			)}
			{...props}
		/>
	),
	Steps: ({ ...props }) => (
		<div
			className="[&>h3]:step steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8"
			{...props}
		/>
	),
	InfoTooltip: ({ className, children, ...props }: React.ComponentProps<"button">) => {
		return (
			<Popover>
				<PopoverTrigger asChild>
					<Button
						size="icon-sm"
						variant="ghost"
						className="ml-0 align-middle hover:bg-transparent"
						{...props}
					>
						<InfoCircle />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="rounded-xl px-3 py-2 text-sm">
					{children}
				</PopoverContent>
			</Popover>
		)
	},
	ComponentPreview: ComponentPreview
}
