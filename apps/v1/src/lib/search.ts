import { create, insert, search as oramaSearch } from "@orama/orama";
import type { Orama, Schema } from "@orama/orama";
import { readFile, readdir } from "fs/promises";
import { join } from "path";

const schema = {
	title: "string",
	description: "string",
	content: "string",
	path: "string",
} satisfies Schema;

let db: Orama<typeof schema> | null = null;

function extractFrontmatter(content: string) {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return { frontmatter: {}, body: content };
	}

	const frontmatter: Record<string, string> = {};
	const frontmatterContent = match[1];
	const body = match[2];

	for (const line of frontmatterContent.split("\n")) {
		const [key, ...valueParts] = line.split(":");
		if (key && valueParts.length > 0) {
			frontmatter[key.trim()] = valueParts.join(":").trim();
		}
	}

	return { frontmatter, body };
}

async function indexMDXFiles() {
	const componentsDir = join(process.cwd(), "content", "components");
	const files = await readdir(componentsDir);
	const docs = [];

	for (const file of files) {
		if (!file.endsWith(".mdx")) continue;

		const filePath = join(componentsDir, file);
		const content = await readFile(filePath, "utf-8");
		const { frontmatter, body } = extractFrontmatter(content);

		// Extract first paragraph as description if not in frontmatter
		const description =
			frontmatter.description ||
			body.split("\n\n")[0]?.replace(/#+\s*/, "") ||
			"";

		docs.push({
			title: frontmatter.title || file.replace(".mdx", ""),
			description,
			content: body.substring(0, 500), // First 500 chars for search
			path: `/docs/components/${file.replace(".mdx", "")}`,
		});
	}

	return docs;
}

export async function getSearchDB() {
	if (db) return db;

	db = await create({
		schema,
	});

	// Index documentation content from MDX files
	const docs = await indexMDXFiles();

	for (const doc of docs) {
		await insert(db, doc);
	}

	return db;
}

export async function search(query: string) {
	const db = await getSearchDB();
	const results = await oramaSearch(db, {
		term: query,
		properties: ["title", "description", "content"],
	});

	return results.hits.map((hit) => ({
		title: hit.document.title as string,
		description: hit.document.description as string,
		path: hit.document.path as string,
		score: hit.score,
	}));
}

