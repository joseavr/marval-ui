"use client"

import { LucideBookMarked } from "lucide-react"
import { useState } from "react"

import { Button } from "@/registry/button"
import { SortableDragHandle, SortableItem, SortableList } from "@/registry/sortable-list"

const initialItems = [
	{
		id: "1",
		title: "code-scope-highlighter",
		description: "Stay focus on the current scope of work."
	},
	{
		id: "2",
		title: "shorturl",
		description: "Shorten your URLs."
	},
	{
		id: "3",
		title: "Apptracker",
		description: "Final Project CMSC 335: MongoDB, Express, Node.js, Email.js, Bootstrap."
	},
	{
		id: "4",
		title: "cheat-sheets",
		description: "A compilation of notes derived from classes, and personal knowledge."
	}
]

export function SortableListDemo2() {
	const [items, setItems] = useState(initialItems)

	return (
		<div className="flex flex-col gap-2">
			<div>Pinned</div>

			<SortableList
				className="grid w-full grid-cols-2 gap-3"
				items={items}
				onItemsChange={setItems}
				renderItem={(item) => (
					<SortableItem id={item.id}>
						<div className="flex h-[96px] w-full flex-col gap-2.5 rounded-md border border-border bg-muted/50 px-4 py-3 text-sm">
							<div className="flex w-full flex-row justify-between">
								<div className="flex items-center gap-2">
									<LucideBookMarked className="size-3.5 text-muted-foreground" />
									<div className="font-semibold">{item.title}</div>
									<div className="rounded-full border border-border px-1.5 py-0.5 text-xs leading-3">
										Public
									</div>
								</div>
								<Button asChild variant="ghost" size="sm">
									<SortableDragHandle />
								</Button>
							</div>
							<div className="text-muted-foreground text-xs">{item.description}</div>
						</div>
					</SortableItem>
				)}
			/>
		</div>
	)
}
