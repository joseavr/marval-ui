// async function getComponents() {
// 	const componentsDir = join(process.cwd(), "content", "components");
// 	const files = await readdir(componentsDir);
// 	const components = [];

// 	for (const file of files) {
// 		if (!file.endsWith(".mdx")) continue;

// 		const filePath = join(componentsDir, file);
// 		const content = await readFile(filePath, "utf-8");
// 		const { frontmatter } = extractFrontmatter(content);

// 		components.push({
// 			name: frontmatter.title || file.replace(".mdx", ""),
// 			description: frontmatter.description || "",
// 			href: `/docs/components/${file.replace(".mdx", "")}`,
// 		});
// 	}

// 	return components.sort((a, b) => a.name.localeCompare(b.name));
// }

export default async function ComponentsPage() {
	// const components = await getComponents();

	return (
		<div>
			<h1 className="mb-8 font-bold text-4xl">Components</h1>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{/* {components.map((component) => (
					<Link
						key={component.name}
						href={component.href}
						className="rounded-lg border p-6 transition-colors hover:bg-gray-50"
					>
						<h2 className="mb-2 text-xl font-semibold">
							{component.name}
						</h2>
						<p className="text-gray-600">{component.description}</p>
					</Link>
				))} */}
			</div>
		</div>
	)
}
