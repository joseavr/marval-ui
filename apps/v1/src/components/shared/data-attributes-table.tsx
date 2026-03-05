import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table"

interface DataAttributesTableProps {
	data?: {
		title: string
		description?: string
		value?: string
	}[]
	slot?: string
}

export function DataAttributesTable({ data, slot }: DataAttributesTableProps) {
	const allAttributes = [
		...(slot ? [{ title: "[data-slot]", value: `"${slot}"` }] : []),
		...(data ?? []),
	]

	return (
		<div className="mt-10 overflow-hidden rounded-lg border border-border">
			<Table>
				<TableHeader>
					<TableRow className="bg-accent dark:bg-accent/50">
						<TableHead>Data Attribute</TableHead>
						<TableHead>Value</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{allAttributes.map((attribute, index) => (
						<TableRow key={`${attribute.title}-${index}`}>
							<TableCell>
								<code className="rounded-md bg-blue-400/20 p-1 text-[13px] text-blue-400">
									{attribute.title}
								</code>
							</TableCell>
							<TableCell>
								{attribute.value ? (
									<code className="rounded-md bg-muted/60 p-1 text-muted-foreground">
										{attribute.value}
									</code>
								) : (
									<span>{attribute.description}</span>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
