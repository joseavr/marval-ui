import {
	ArrowNarrowLeft,
	ArrowNarrowRight,
	BookOpen01,
	ChevronDown,
	Edit05
} from "@untitledui/icons"
import { findNeighbour } from "fumadocs-core/page-tree"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Fragment } from "react"

import { BugIcon } from "@/components/icons/bug-icon"
import { GithubIcon } from "@/components/icons/github-icon"
import { IssueOpenIcon } from "@/components/icons/issue-icon"
import { CopyMarkdownButton } from "@/components/pages/docs/copy-markdown-button"
import { DocsTableOfContents } from "@/components/pages/docs/toc"
import { InlineCode } from "@/components/shared/typography"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { source } from "@/lib/fumadocs"
import { mdxComponents } from "@/lib/mdx-components"
// export async function generateStaticParams() {
// 	try {
// 		const files = await import("fs/promises");
// 		const entries = await files.readdir(componentsDir, {
// 			withFileTypes: true,
// 		});
// 		return entries
// 			.filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
// 			.map((entry) => ({
// 				component: entry.name.replace(".mdx", ""),
// 			}));
// 	} catch {
// 		return [];
// 	}
// }

export default async function ComponentPage(props: {
	params: Promise<{ slug: string[] | undefined }>
}) {
	const { slug } = await props.params
	const page = source.getPage(slug)
	if (!page) {
		return notFound()
	}
	const neighbourPages = findNeighbour(source.pageTree, page.url)
	const document = page.data
	const MDX = document?.body
	const {
		title,
		description,
		metadata,
		toc,
		lastModified,
		releaseDate,
		getText,
		isPublished
	} = document

	if (!isPublished) return notFound()
	const markdownRaw = await getText("raw")
	const parseMarkdown = (text: string) => {
		const draftIndex = text.indexOf("---", 4)
		return markdownRaw.slice(draftIndex + 4).trim()
	}

	return (
		<div data-id="docs-rightside-divided-in-two" className="flex items-stretch xl:w-full">
			<article className="flex min-w-0 flex-1 flex-col gap-8 pt-4">
				<div className="mx-auto flex w-full min-w-0 max-w-2xl flex-1 flex-col gap-8">
					<header data-id="mdx-header" className="flex w-full flex-col gap-3.5">
						<Breadcrumb className="mb-3.5">
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink asChild className="relative">
										<Link href="/docs">
											<BookOpen01 className="peer z-10 size-3.5" />
											<span className="-z-10 -inset-2 absolute rounded-full transition-colors peer-hover:bg-accent" />
										</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>

								{!!slug &&
									slug.map((s, index, arr) => {
										return (
											<Fragment key={s}>
												<BreadcrumbSeparator />
												<BreadcrumbItem key={s}>
													{index === arr.length - 1 ? (
														<span className="font-medium text-foreground">{s}</span>
													) : (
														<BreadcrumbLink asChild>
															<Link href={`/docs/${s}`}>{s}</Link>
														</BreadcrumbLink>
													)}
												</BreadcrumbItem>
											</Fragment>
										)
									})}
							</BreadcrumbList>
						</Breadcrumb>

						<div className="flex flex-row items-center justify-between">
							<h1 className="scroll-m-20 font-medium text-3xl tracking-tight sm:text-4xl">
								{title}
							</h1>

							<div className="flex flex-row gap-2">
								<DocsTableOfContents
									toc={toc}
									variant="dropdown"
									className="border-none bg-secondary shadow-none xl:hidden"
								/>

								<ButtonGroup>
									<CopyMarkdownButton text={parseMarkdown(markdownRaw)} animationDuration={2500}/>

									<ButtonGroupSeparator />

									<Button
										variant="outline"
										size="icon-sm"
										className="border-none bg-secondary shadow-none"
									>
										<ChevronDown />
									</Button>
								</ButtonGroup>

								{neighbourPages.previous && (
									<Button
										variant="outline"
										size="icon-sm"
										asChild
										className="border-none bg-secondary shadow-none"
									>
										<Link href={neighbourPages.previous.url}>
											<ArrowNarrowLeft />
										</Link>
									</Button>
								)}

								{neighbourPages.next && (
									<Button
										variant="outline"
										size="icon-sm"
										className="border-none bg-secondary shadow-none"
									>
										<Link href={neighbourPages.next.url}>
											<ArrowNarrowRight />
										</Link>
									</Button>
								)}
							</div>
						</div>

						<span className="font-medium text-lg text-muted-foreground">
							{description}
						</span>

						{metadata && (
							<div className="flex flex-col gap-1 text-muted-foreground">
								<div className="flex items-center gap-2">
									<span className="min-w-14">GitHub</span>
									<div className="flex gap-1.5 text-accent-foreground">
										<Button
											asChild
											variant="ghost"
											size="default"
											className="flex h-6 items-center gap-1 px-1.5! font-normal hover:underline"
										>
											<a href={metadata.github.repoUrl.url}>
												<GithubIcon />
												<span>{metadata.github.repoUrl.label}</span>
											</a>
										</Button>

										<Button
											asChild
											variant="ghost"
											size="default"
											className="flex h-6 items-center gap-1 px-1.5! font-normal hover:underline"
										>
											<a href={metadata.github.openIssuesUrl}>
												<BugIcon />
												<span>Issue</span>
											</a>
										</Button>

										<Button
											asChild
											variant="ghost"
											size="default"
											className="flex h-6 items-center gap-1 px-1.5! font-normal hover:underline"
										>
											<a href={metadata.github.repoUrl.url}>
												<IssueOpenIcon />
												<span>Open Issues 200</span>
											</a>
										</Button>
									</div>
								</div>
								<div className="flex gap-2">
									<span className="min-w-14">Docs</span>
									<span className="text-accent-foreground">
										<Button
											asChild
											variant="ghost"
											size="default"
											className="flex h-6 items-center gap-1 px-1.5! font-normal hover:underline"
										>
											<a href={metadata.editPageUrl}>
												<Edit05 />
												<span>Edit on GitHub</span>
											</a>
										</Button>
									</span>
								</div>
								{metadata.credits?.map((person) => (
									<div key={person.name} className="flex gap-2">
										<span className="min-w-14">Credits</span>
										<span className="text-accent-foreground">
											<Button
												asChild
												variant="ghost"
												size="default"
												className="flex h-6 items-center gap-1 px-1.5! font-normal hover:underline"
											>
												<a href={person.url}>
													<span>{person.name}</span>
												</a>
											</Button>
										</span>
									</div>
								))}
							</div>
						)}
					</header>
					<div data-id="mdx-content">
						<MDX components={mdxComponents} />
					</div>
				</div>

				<footer
					data-id="mdx-footer"
					className="mx-auto mb-8 flex w-full min-w-0 max-w-2xl flex-1 flex-col gap-12"
				>
					<div className="flex justify-between">
						<div>Built by Jose Valdivia. Hire me please!</div>
						{!!lastModified && (
							<div>
								{"Last updated: "}
								<InlineCode className="font-bold text-xs">
									{new Intl.DateTimeFormat("en-US", {
										month: "2-digit",
										day: "2-digit",
										year: "numeric"
									}).format(new Date())}
								</InlineCode>
							</div>
						)}
					</div>
				</footer>
			</article>

			<aside
				data-id="toc"
				className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] w-72 pt-4 text-sm xl:flex"
			>
				<div className="flex-1">
					<DocsTableOfContents toc={toc} variant="list" />
				</div>
			</aside>
		</div>
	)
}
