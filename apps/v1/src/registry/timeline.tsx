"use client"

import { cva } from "class-variance-authority"
import React, { createContext, useContext } from "react"

import { cn } from "@/lib/utils"

type ItemStatus = "upcoming" | "current" | "completed"

const ROOT_NAME = "Timeline"
const ITEM_NAME = "TimelineItem"
const BULLET_NAME = "TimelineBullet"
const CONNECTOR_NAME = "TimelineConnector"
const CONTENT_NAME = "TimelineContent"

function getItemStatus(
	itemIndex: number | undefined,
	activeIndex: number | undefined
): ItemStatus {
	if (activeIndex === undefined || itemIndex === undefined) return "upcoming"
	if (itemIndex < activeIndex) return "completed"
	if (itemIndex === activeIndex) return "current"
	return "upcoming"
}

type TimelineContextValue = {
	activeIndex: TimelineProps["activeIndex"]
	orientation: TimelineProps["orientation"]
	variant: TimelineProps["variant"]
	isReverse: TimelineProps["reverse"]
}

const TimelineContext = createContext<TimelineContextValue | undefined>(undefined)

function useTimelineContext(consumerName: string) {
	const context = useContext(TimelineContext)
	if (!context) {
		throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``)
	}
	return context
}

const timelineVariants = cva("relative flex", {
	variants: {
		orientation: {
			vertical: "flex-col",
			horizontal: "flex-row items-start"
		},
		variant: {
			default: "",
			alternate: ""
		},
		isReverse: {
			true: "",
			false: ""
		}
	},
	compoundVariants: [
		{
			orientation: "vertical",
			isReverse: true,
			class: "flex-col-reverse"
		},
		{
			orientation: "horizontal",
			isReverse: true,
			class: "flex-row-reverse"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			class: "relative w-full"
		},
		{
			orientation: "horizontal",
			variant: "alternate",
			class: "items-center"
		}
	],
	defaultVariants: {
		orientation: "vertical",
		variant: "default"
	}
})

interface TimelineProps extends React.PropsWithChildren {
	className?: string
	activeIndex?: number
	orientation?: "horizontal" | "vertical"
	variant?: "default" | "alternate"
	bulletSize?: number
	lineWidth?: number
	reverse?: boolean
	ariaLabel?: string
}

function Timeline({
	children,
	activeIndex,
	orientation,
	variant = "default",
	bulletSize,
	lineWidth,
	reverse,
	className,
	ariaLabel = "Timeline"
}: TimelineProps) {
	const contextValue: TimelineContextValue = {
		activeIndex,
		orientation,
		variant,
		isReverse: reverse
	}

	const _children = React.Children.toArray(children)
	const totalItems = React.Children.count(_children)

	const items = React.Children.map(_children, (item, index) => {
		if (
			!React.isValidElement<{
				itemIndex: number
				isLastItem: boolean
				isFirstItem: boolean
			}>(item)
		) {
			return item
		}
		return React.cloneElement(item, {
			itemIndex: index,
			isLastItem: index === totalItems - 1,
			isFirstItem: index === 0
		})
	})

	React.useEffect(() => {
		if (activeIndex !== undefined) {
			const statusMessage =
				activeIndex === 0
					? `Timeline: Started at step ${activeIndex + 1} of ${totalItems}`
					: `Timeline: Now at step ${activeIndex + 1} of ${totalItems}`
			const announcement = document.getElementById("timeline-announcer")
			if (announcement) {
				announcement.textContent = statusMessage
			}
		}
	}, [activeIndex, totalItems])

	return (
		<TimelineContext value={contextValue}>
			<ul
				aria-label={ariaLabel}
				data-slot="timeline"
				data-orientation={orientation}
				data-variant={variant}
				style={
					{
						"--timeline-bullet-size": `${bulletSize ?? 14}px`,
						"--timeline-connector-width": `${lineWidth ?? 2}px`
					} as React.CSSProperties
				}
				className={cn(
					timelineVariants({
						orientation,
						variant,
						className,
						isReverse: reverse
					})
				)}
			>
				{items}
			</ul>
			<output
				id="timeline-announcer"
				aria-live="polite"
				aria-atomic="true"
				className="sr-only"
			/>
		</TimelineContext>
	)
}

const timelineItemVariants = cva("group/item relative flex", {
	variants: {
		orientation: {
			vertical: "",
			horizontal: ""
		},
		variant: {
			default: "",
			alternate: ""
		},
		isAlternateRight: {
			true: "",
			false: ""
		}
	},
	compoundVariants: [
		{
			orientation: "vertical",
			variant: "default",
			class: "gap-3"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			isAlternateRight: false,
			class: "w-1/2 gap-3 pr-6"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			isAlternateRight: true,
			class: "ml-auto w-1/2 flex-row-reverse gap-3 pl-6"
		},
		{
			orientation: "horizontal",
			variant: "default",
			class: "flex-col gap-3"
		},
		{
			orientation: "horizontal",
			variant: "alternate",
			class: "grid min-w-0 grid-rows-[1fr_auto_1fr] gap-3 pr-4"
		}
	],
	defaultVariants: {
		orientation: "vertical",
		variant: "default",
		isAlternateRight: false
	}
})

type TimelineItemContextValue = {
	status: ItemStatus
	isAlternateRight: boolean
	itemIndex: TimelineItemInternalProps["itemIndex"]
	isLastItem: TimelineItemInternalProps["isLastItem"]
	isFirstItem: TimelineItemInternalProps["isFirstItem"]
}

const TimelineItemContext = createContext<TimelineItemContextValue | undefined>(undefined)

function useTimelineItemContext(consumerName: string) {
	const context = useContext(TimelineItemContext)
	if (!context) {
		throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``)
	}
	return context
}

interface TimelineItemProps {
	className?: string
	children?: React.ReactNode
}

interface TimelineItemInternalProps extends TimelineItemProps {
	itemIndex: number
	isLastItem: boolean
	isFirstItem: boolean
}
function TimelineItem(props: TimelineItemProps) {
	return <TimelineItemInternal {...(props as TimelineItemInternalProps)} />
}

function TimelineItemInternal({
	className,
	itemIndex,
	isLastItem,
	isFirstItem,
	children
}: TimelineItemInternalProps) {
	const { orientation, variant, activeIndex } = useTimelineContext(ITEM_NAME)

	const isAlternateRight = variant === "alternate" && itemIndex % 2 === 1
	const status = getItemStatus(itemIndex, activeIndex)

	const statusLabels: Record<ItemStatus, string> = {
		completed: "Completed",
		current: "Current step",
		upcoming: "Upcoming"
	}

	const contextValue: TimelineItemContextValue = {
		isAlternateRight,
		status,
		itemIndex,
		isLastItem,
		isFirstItem
	}

	return (
		<TimelineItemContext value={contextValue}>
			<li
				aria-current={status === "current" ? "step" : undefined}
				aria-label={`Step ${itemIndex + 1}: ${statusLabels[status]}`}
				data-slot="timeline-item"
				data-status={status}
				data-orientation={orientation}
				data-alternate-right={isAlternateRight ? "" : undefined}
				className={cn(
					timelineItemVariants({
						orientation,
						variant,
						isAlternateRight,
						className
					})
				)}
			>
				{children}
			</li>
		</TimelineItemContext>
	)
}

const timelineBulletVariants = cva(
	"relative z-10 flex size-(--timeline-bullet-size) shrink-0 items-center justify-center rounded-full bg-background text-background [border-width:var(--timeline-connector-width)] dark:text-foreground",
	{
		variants: {
			status: {
				completed: "border-primary",
				current: "border-primary",
				upcoming: "border-border"
			},
			orientation: {
				vertical: "",
				horizontal: ""
			},
			variant: {
				default: "",
				alternate: ""
			},
			isAlternateRight: {
				true: "",
				false: ""
			}
		},
		compoundVariants: [
			{
				variant: "alternate",
				orientation: "horizontal",
				class: "row-start-2 bg-background"
			},
			{
				variant: "alternate",
				orientation: "vertical",
				isAlternateRight: false,
				class: "absolute -right-[calc(var(--timeline-bullet-size)/2)] bg-background"
			},
			{
				variant: "alternate",
				orientation: "vertical",
				isAlternateRight: true,
				class: "absolute -left-[calc(var(--timeline-bullet-size)/2)] bg-background"
			}
		],
		defaultVariants: {
			status: "upcoming",
			orientation: "vertical",
			variant: "default",
			isAlternateRight: false
		}
	}
)

interface TimelineBulletProps extends React.PropsWithChildren {
	className?: string
}
function TimelineBullet({ children, className }: TimelineBulletProps) {
	const { variant, orientation } = useTimelineContext(BULLET_NAME)
	const { status, isAlternateRight } = useTimelineItemContext(BULLET_NAME)

	return (
		<div
			aria-hidden="true"
			data-slot="timeline-bullet"
			data-status={status}
			data-orientation={orientation}
			className={cn(
				timelineBulletVariants({
					status,
					orientation,
					variant,
					isAlternateRight,
					className
				})
			)}
		>
			{children}
		</div>
	)
}

const timelineConnectorVariants = cva("absolute z-0 w-0", {
	variants: {
		isCompleted: {
			true: "border-primary",
			false: "border-border"
		},
		orientation: {
			vertical: "border-l [border-left-width:var(--timeline-connector-width)]",
			horizontal: "border-t [border-top-width:var(--timeline-connector-width)]"
		},
		variant: {
			default: "",
			alternate: ""
		},
		isAlternateRight: {
			true: "",
			false: ""
		},
		lineVariant: {
			solid: "border-solid",
			dashed: "border-dashed"
		}
	},
	compoundVariants: [
		{
			orientation: "vertical",
			variant: "default",
			class:
				"start-[calc(var(--timeline-bullet-size)/2-var(--timeline-connector-width)/2)] top-3 h-full"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			isAlternateRight: false,
			class: "top-2 -right-[calc(var(--timeline-connector-width)/2)] h-full"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			isAlternateRight: true,
			class: "top-2 -left-[calc(var(--timeline-connector-width)/2)] h-full"
		},
		{
			orientation: "horizontal",
			variant: "default",
			class:
				"start-3 top-[calc(var(--timeline-bullet-size)/2-(var(--timeline-connector-width)/2))] w-full"
		},
		{
			orientation: "horizontal",
			variant: "alternate",
			class:
				"top-[calc(var(--timeline-bullet-size)/2-var(--timeline-connector-width)/2)] left-(--timeline-bullet-size) row-start-2 w-[calc(100%-var(--timeline-bullet-size))]"
		}
	],
	defaultVariants: {
		isCompleted: false,
		lineVariant: "solid",
		orientation: "vertical",
		variant: "default",
		isAlternateRight: false
	}
})

interface TimelineConnectorProps extends React.PropsWithChildren {
	variant?: "solid" | "dashed"
	forceMount?: boolean
	className?: string
}

function TimelineConnector({
	forceMount = false,
	className,
	variant: lineVariant = "solid"
}: TimelineConnectorProps) {
	const { activeIndex, orientation, variant, isReverse } =
		useTimelineContext(CONNECTOR_NAME)
	const { isAlternateRight, itemIndex, status, isLastItem, isFirstItem } =
		useTimelineItemContext(CONNECTOR_NAME)

	const nextItemIndex = itemIndex + 1
	const nextItemStatus = isLastItem ? null : getItemStatus(nextItemIndex, activeIndex)

	const reverseNextItemIndex = itemIndex
	const reverseNextItemStatus = getItemStatus(reverseNextItemIndex, activeIndex)

	if (isReverse && !forceMount && isFirstItem) return null
	if (!isReverse && !forceMount && isLastItem) return null

	const isConnectorCompleted = !isReverse
		? nextItemStatus === "completed" || nextItemStatus === "current"
		: reverseNextItemStatus === "completed" || reverseNextItemStatus === "current"

	return (
		<div
			aria-hidden="true"
			data-slot="timeline-connector"
			data-completed={isConnectorCompleted ? "" : undefined}
			data-status={status}
			data-orientation={orientation}
			className={cn(
				timelineConnectorVariants({
					isCompleted: isConnectorCompleted,
					orientation,
					variant,
					isAlternateRight,
					lineVariant,
					className
				})
			)}
		/>
	)
}

const timelineContentVariants = cva("flex-1", {
	variants: {
		orientation: {
			vertical: "pb-15",
			horizontal: "pr-8 group-last/item:pr-0"
		},
		variant: {
			default: "",
			alternate: ""
		},
		isAlternateRight: {
			true: "",
			false: ""
		},
		isReverse: {
			true: "",
			false: ""
		}
	},
	compoundVariants: [
		{
			orientation: "vertical",
			isReverse: true,
			class: "group-first/item:pb-0"
		},
		{
			orientation: "vertical",
			isReverse: false,
			class: "group-last/item:pb-0"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			isAlternateRight: false,
			class: "text-right"
		},
		{
			orientation: "horizontal",
			variant: "alternate",
			isAlternateRight: false,
			class: "row-start-3 pt-2"
		},
		{
			orientation: "horizontal",
			variant: "alternate",
			isAlternateRight: true,
			class: "row-start-1 pb-2"
		},
		{
			orientation: "horizontal",
			isReverse: true,
			class: "group-first/item:pr-0"
		},
		{
			orientation: "horizontal",
			isReverse: false,
			class: "group-last/item:pr-0"
		}
	],
	defaultVariants: {
		orientation: "vertical",
		variant: "default",
		isAlternateRight: false,
		isReverse: false
	}
})

interface TimelineContentProps {
	children?: React.ReactNode
	className?: string
}

function TimelineContent({ children, className }: TimelineContentProps) {
	const { variant, orientation, isReverse } = useTimelineContext(CONTENT_NAME)
	const { status, isAlternateRight } = useTimelineItemContext(CONTENT_NAME)

	return (
		<div
			data-slot="timeline-content"
			data-status={status}
			className={cn(
				timelineContentVariants({
					orientation,
					variant,
					isAlternateRight,
					isReverse,
					className
				})
			)}
		>
			{children}
		</div>
	)
}

export { Timeline, TimelineItem, TimelineBullet, TimelineConnector, TimelineContent }
