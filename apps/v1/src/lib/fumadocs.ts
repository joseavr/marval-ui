import { loader } from "fumadocs-core/source"

import { docs } from "@/.source"

// Create base source to access page data in transformer
const baseSource = loader({
	baseUrl: "/docs",
	source: docs.toFumadocsSource()
})

// Export all Fumadocs mdx output from /content/docs/**
export const source = loader({
	baseUrl: "/docs",
	source: docs.toFumadocsSource(),
	pageTree: {
		transformers: [
			{
				file(node, _filePath) {
					// Extract slug from node URL (e.g., "/docs/components/button" -> ["components", "button"])
					const slug = node.url.replace("/docs/", "").split("/").filter(Boolean)

					// Get page data to access frontmatter
					const page = baseSource.getPage(slug.length > 0 ? slug : undefined)

					// Extract isPublished from frontmatter and add to node
					const isPublished = page?.data.isPublished ?? false

					return {
						...node,
						isPublished
					}
				}
			}
		]
	}
})
