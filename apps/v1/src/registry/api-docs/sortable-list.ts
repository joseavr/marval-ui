import type { ButtonVariantProps } from "@/registry/button"

type SortableBaseItem = {
	id: string | number
}

export interface SortableListProps<ItemT extends SortableBaseItem> {
	/**
	 * The controlled items currently being managed. Can have any shape but must include an `id` of `type = string | number`
	 * - Use this prop for controlled usage.
	 * - Should be used in conjunction with `onItemsChange`.
	 */
	items: ItemT[]
	/**
	 * Callback called when items are added or removed.
	 * - Should be used in conjunction with `items`.
	 * ```ts
	 * const [state, setState] = useState()
	 *
	 * onItemsChange={(items) => {
	 *   setState(items)
	 * }}
	 * ```
	 */
	onItemsChange: (items: ItemT[]) => void
	/**
	 * A callback to render the blueprints of an item. Use for render all items in the list
	 *
	 * ```tsx
	 * <SortableList
	 *    renderItem={(item) => (
	 *      <SortableItem id={item.id}>
	 *        <Button asChild variant="ghost">
	 *          <SortableDragHandle />
	 *        </Button>
	 *      </SortableItem>
	 *    )}
	 * />
	 * ```
	 */
	renderItem: (item: ItemT, index: number, isOverlay?: boolean) => React.ReactNode
	/** The class name of the component  */
	className?: string
}

export interface SortableItemProps {
	/** The identifier for this item.
	 * - Must have a unique id property.
	 * - Id's are used for dragging animations.
	 */
	id: number | string
	children?: React.ReactNode
}

export interface SortableHandleProps {
	asChild?: boolean
	/**
	 * The variant of the handle button.
	 * @default "ghost"
	 */
	variant?: ButtonVariantProps["variant"]

	/**
	 * The size of the handle button.
	 * @default "icon-sm"
	 */
	size?: ButtonVariantProps["size"]
	children?: React.ReactNode
}
