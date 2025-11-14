import { loader } from "fumadocs-core/source"
import { docs } from "@/.source"

// Export all Fumadocs mdx output from /content/components
export const source = loader({
	baseUrl: "/docs",
	source: docs.toFumadocsSource()
})
