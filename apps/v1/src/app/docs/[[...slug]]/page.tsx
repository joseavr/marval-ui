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
		<div>
			<MDX components={mdxComponents} />
		</div>
	)
}
