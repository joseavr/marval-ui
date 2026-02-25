import { Kbd } from "@/components/ui/kbd"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table"

interface KeyboardShortcutsTableProps {
	data: {
		keys: string[]
		description: string
	}[]
}

export function KeyboardShortcutsTable({ data }: KeyboardShortcutsTableProps) {
	return (
		<div className="mt-10 overflow-hidden rounded-lg border border-border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Key</TableHead>
						<TableHead>Description</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((shortcut, index) => (
						<TableRow key={`${shortcut.keys.join(" + ")}-${index}`}>
							<TableCell className="flex items-center gap-2">
								{shortcut.keys.map((key) => {
									if (key === "+") {
										return <span key={key}>{key}</span>
									}
									return (
										<Kbd
											key={key}
											className="relative -top-[0.03em] box-border inline-flex h-fit min-w-[1.75em] shrink-0 select-none items-center justify-center whitespace-nowrap rounded-xs bg-neutral-100 px-[0.5em] pb-[0.05em] align-text-top font-normal text-[0.75em] text-neutral-900 leading-[1.7em] shadow-[inset_0_-0.05em_0.5em_rgba(0,0,0,0.05),inset_0_0.05em_rgba(255,255,255,0.7),inset_0_0.25em_0.5em_rgba(255,255,255,0.04),inset_0_-0.1em_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,0.15),0_0.08em_0.17em_rgba(0,0,0,0.25)] transition-[box-shadow,background-color] duration-150 [word-spacing:-0.1em] dark:bg-accent/20 dark:text-foreground"
										>
											{key}
										</Kbd>
									)
								})}
							</TableCell>
							<TableCell>
								<span>{shortcut.description}</span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
