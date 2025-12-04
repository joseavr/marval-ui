import { notFound } from "next/navigation"

import { source } from "@/lib/fumadocs"
import { mdxComponents } from "@/lib/mdx-componets"

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

	const document = page.data

	const MDX = document?.body

	return (
		<div id="right-divided-in-two" className="flex items-stretch xl:w-full">
			<article className="flex min-w-0 flex-1 flex-col pt-8">
				<div className="mx-auto flex w-full min-w-0 max-w-2xl flex-1 flex-col gap-8">
					<div id="mdx-title">TITLE MDX</div>
					<MDX components={mdxComponents} />
				</div>
				<div id="MDX footer"></div>
			</article>

			<aside
				id="toc"
				className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] w-72 pt-8 xl:flex"
			>
				<div className="flex-1">TOC</div>
			</aside>
		</div>
	)
}
