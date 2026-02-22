"use client"

import { useState } from "react"

import { Button } from "@/registry/button"
import { SortableDragHandle, SortableItem, SortableList } from "@/registry/sortable-list"

const initialItems = [
	{
		id: "1",
		title: "Item 1",
		description: "Description for item 1"
	},
	{
		id: "2",
		title: "Item 2",
		description: "Description for item 2"
	},
	{
		id: "3",
		title: "Item 3",
		description: "Description for item 3"
	},
	{
		id: "4",
		title: "Item 4",
		description: "Description for item 4"
	}
]

export function SortableListDemo() {
	const [items, setItems] = useState(initialItems)

	return (
		<SortableList
			className="flex gap-1"
			items={items}
			onItemsChange={setItems}
			renderItem={(item) => (
				<SortableItem id={item.id}>
					<div className="flex w-full flex-wrap items-center gap-2.5 rounded-md border border-border bg-muted/50 px-4 py-3 text-sm">
						<Button asChild variant="ghost">
							<SortableDragHandle />
						</Button>
						<div>
							<div>{item.title}</div>
							<div className="text-muted-foreground">{item.description}</div>
						</div>
					</div>
				</SortableItem>
			)}
		/>
	)
}
