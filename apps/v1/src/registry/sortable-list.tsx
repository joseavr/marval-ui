"use client"

import {
	type Active,
	DndContext,
	type DragEndEvent,
	type DraggableAttributes,
	type DraggableSyntheticListeners,
	DragOverlay,
	type DragStartEvent,
	type DropAnimation,
	defaultDropAnimationSideEffects,
	KeyboardSensor,
	PointerSensor,
	type UniqueIdentifier,
	useSensor,
	useSensors
} from "@dnd-kit/core"
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { Slot } from "radix-ui"
import React from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/button"

const DRAG_OPACITY = 0.4

type SortableBaseItem = {
	id: UniqueIdentifier
}

type SortableListProps<ItemT extends SortableBaseItem> = {
	items: ItemT[]
	onItemsChange: (items: ItemT[]) => void
	renderItem: (item: ItemT, index: number, isOverlay?: boolean) => React.ReactNode
	className?: string
}

function SortableList<ItemT extends SortableBaseItem>({
	items,
	onItemsChange,
	renderItem,
	className
}: SortableListProps<ItemT>) {
	const [active, setActive] = React.useState<Active | null>(null)
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	const [activeItem, activeIndex] = React.useMemo(() => {
		if (active === null) {
			return [null, null]
		}

		const index = items.findIndex(({ id }) => id === active.id)

		return [items[index], index]
	}, [active, items])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const handleDragStart = ({ active: activeEvent }: DragStartEvent) => {
		setActive(activeEvent)
	}

	const handleDragEnd = ({ active: activeEvent, over }: DragEndEvent) => {
		if (over && activeEvent.id !== over.id) {
			const activeEventIndex = items.findIndex(({ id }) => id === activeEvent.id)
			const overIndex = items.findIndex(({ id }) => id === over.id)

			onItemsChange(arrayMove(items, activeEventIndex, overIndex))
		}

		setActive(null)
	}

	const handleDragCancel = () => {
		setActive(null)
	}

	return (
		<DndContext
			onDragCancel={handleDragCancel}
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
			sensors={sensors}
		>
			<SortableContext items={items}>
				<ul
					data-slot="sortable-list"
					role="application"
					className={cn(
						"flex list-inside list-none list-image-none flex-col p-0",
						className
					)}
				>
					{items.map((item, index) => (
						<React.Fragment key={item.id}>{renderItem(item, index)}</React.Fragment>
					))}
				</ul>
			</SortableContext>
			{mounted &&
				createPortal(
					<Overlay>
						{activeItem && activeIndex !== null
							? renderItem(activeItem, activeIndex, true)
							: null}
					</Overlay>,
					document.body
				)}
		</DndContext>
	)
}

type SortableItemProps<ItemT extends SortableBaseItem> = React.PropsWithChildren<{
	id: ItemT["id"]
}>

type SortableItemContextValue = {
	attributes: DraggableAttributes
	listeners: DraggableSyntheticListeners
	ref: (node: HTMLElement | null) => void
	isDragging: boolean
}

const SortableItemContext = React.createContext<SortableItemContextValue | null>(null)

function useSortableItemContext() {
	const context = React.useContext(SortableItemContext)

	if (!context) {
		throw new Error("useSortableItemContext must be used within a SortableItemContext")
	}

	return context
}

function SortableItem<ItemT extends SortableBaseItem>({
	id,
	children
}: SortableItemProps<ItemT>) {
	const {
		attributes,
		isDragging,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition
	} = useSortable({ id })

	const context = React.useMemo(
		() => ({
			attributes,
			listeners,
			ref: setActivatorNodeRef,
			isDragging
		}),
		[attributes, listeners, setActivatorNodeRef, isDragging]
	)

	const style: React.CSSProperties = {
		opacity: isDragging ? DRAG_OPACITY : undefined,
		transform: CSS.Translate.toString(transform),
		transition
	}

	return (
		<SortableItemContext.Provider value={context}>
			<li
				data-slot="sortable-item"
				data-dragging={isDragging ? "" : undefined}
				className="w-full list-none transition-colors"
				ref={setNodeRef}
				style={style}
			>
				{children}
			</li>
		</SortableItemContext.Provider>
	)
}

function SortableDragHandle({
	children,
	asChild,
	variant = "ghost",
	size = "icon-sm"
}: {
	asChild?: boolean
	children?: React.ReactNode
} & Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
	const { attributes, listeners, ref, isDragging } = useSortableItemContext()

	if (asChild) {
		return (
			<Slot.Root
				data-slot="sortable-drag-handle"
				{...attributes}
				{...listeners}
				ref={ref}
				aria-label="Drag to reorder"
				aria-disabled={isDragging}
			>
				{children}
			</Slot.Root>
		)
	}

	return (
		<Button
			data-slot="sortable-drag-handle"
			size={size}
			variant={variant}
			{...attributes}
			{...listeners}
			className="cursor-grab touch-none active:cursor-grabbing"
			ref={ref}
			aria-label="Drag to reorder"
			aria-disabled={isDragging}
		>
			{children ?? <GripVertical className="size-4" />}
		</Button>
	)
}

const dropAnimationConfig: DropAnimation = {
	sideEffects: defaultDropAnimationSideEffects({
		styles: {
			active: {
				opacity: "0.4"
			}
		}
	})
}

function Overlay({ children }: React.PropsWithChildren) {
	return (
		<DragOverlay
			data-slot="sortable-overlay"
			className="z-100 overflow-hidden rounded-md"
			dropAnimation={dropAnimationConfig}
			style={{
				cursor: "grabbing"
			}}
		>
			{children}
		</DragOverlay>
	)
}

export { SortableList, SortableItem, SortableDragHandle }
