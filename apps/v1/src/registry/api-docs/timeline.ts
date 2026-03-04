export interface TimelineProps {
  /** 
   * Layout direction.
   * @default "vertical"
   */
  orientation?: "horizontal" | "vertical"
	activeIndex?: number
  /** 
   * Position of the items in the timeline.
   * - "default": The timeline items are displayed in a single line/stack
   * - "alternate": The timeline items alternate on both sides of the timeline. Left/right for vertical, above/below for horizontal.
   * @default "default"
   */
	variant?: "default" | "alternate"

  /**
   * The size of the `TimelineBullet` in `px`.
   * @default 14
   */
	bulletSize?: number
  /**
   * The width of the `TimelineConnector` in `px`.
   * @default 2
   */
	lineWidth?: number
  /** 
   * Whether the order the items is rendered in reverse.
   * @default false
  */
	reverse?: boolean
	children?: React.ReactNode
}

export interface TimelineItemProps {
  className?: string
	children?: React.ReactNode
}

export interface TimelineContentProps {
  className?: string
	children?: React.ReactNode
}

export interface TimelineBulletProps {
  className?: string
	children?: React.ReactNode
}

export interface TimelineConnectorProps {
  /**
   * Variant style for the connector's line.
   * @default "solid"
   */
	variant?: "solid" | "dashed"
	/** 
	 * Whether to force render the connector even if it's the last item.
	 */
	forceMount?: boolean
	className?: string
	children?: React.ReactNode
}
