import { createGenerator } from "fumadocs-typescript"
import { AutoTypeTable as AutoTypeTablePrimitive } from "fumadocs-typescript/ui"

let cachedGenerator: ReturnType<typeof createGenerator> | null = null

function getGenerator() {
	if (!cachedGenerator) {
		cachedGenerator = createGenerator()
	}
	return cachedGenerator
}

export function ComponentApiTable(props: Record<string, unknown>) {
	return (
		<div data-slot="component-api-table">
			<AutoTypeTablePrimitive {...props} generator={getGenerator()} />
		</div>
	)
}
