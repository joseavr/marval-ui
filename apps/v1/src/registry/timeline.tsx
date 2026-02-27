"use client"

import { cva } from "class-variance-authority"
import React, { createContext, useContext } from "react"

import { cn } from "@/lib/utils"

type ItemStatus = "pending" | "active" | "completed"

const ROOT_NAME = "Timeline"
const ITEM_NAME = "TimelineItem"
const BULLET_NAME = "TimelineBullet"
const CONNECTOR_NAME = "TimelineConnector"
const CONTENT_NAME = "TimelineContent"

function getItemStatus(
	itemIndex: number | undefined,
	activeIndex: number | undefined
): ItemStatus {
	if (activeIndex === undefined || itemIndex === undefined) return "pending"
	if (itemIndex < activeIndex) return "completed"
	if (itemIndex === activeIndex) return "active"
	return "pending"
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
			linear: "",
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
		variant: "linear"
	}
})

interface TimelineProps {
	className?: string
	children?: React.ReactNode
	activeIndex?: number
	orientation?: "horizontal" | "vertical"
	variant?: "linear" | "alternate"
	bulletSize?: number
	lineWidth?: number
	reverse?: boolean
}

function Timeline({
	children,
	activeIndex,
	orientation,
	variant = "linear",
	bulletSize,
	lineWidth,
	reverse,
	className
}: TimelineProps) {
	const contextValue: TimelineContextValue = {
		activeIndex,
		orientation,
		variant,
		isReverse: reverse
	}

	const _children = React.Children.toArray(children)

	const items = React.Children.map(_children, (item, index) => {
		if (
			!React.isValidElement<{
				itemIndex: number
				isLastItem: boolean
				isFirstItem: boolean
			}>(item)
		)
			throw new Error("Children must be an Component or React Element")
		if (item.type !== TimelineItem) {
			throw new Error("The direct children must be an Array of TimelineItem")
		}
		return React.cloneElement(item, {
			itemIndex: index,
			isLastItem: index === _children.length - 1,
			isFirstItem: index === 0
		})
	})

	return (
		<TimelineContext value={contextValue}>
			<ul
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
					"*:not-last:pr-8",
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
			linear: "",
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
			variant: "linear",
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
			variant: "linear",
			class: "flex-col gap-3 pr-8 last:pr-0"
		},
		{
			orientation: "horizontal",
			variant: "alternate",
			class: "grid min-w-0 grid-rows-[1fr_auto_1fr] gap-3 pr-4 last:pr-0"
		}
	],
	defaultVariants: {
		orientation: "vertical",
		variant: "linear",
		isAlternateRight: false
	}
})

type TimelineItemContextValue = {
	lineVariant: NonNullable<TimelineItemProps["lineVariant"]>
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
	lineVariant?: "dashed" | "solid"
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
	lineVariant = "solid",
	className,
	itemIndex,
	isLastItem,
	isFirstItem,
	children
}: TimelineItemInternalProps) {
	const { orientation, variant, activeIndex } = useTimelineContext(ITEM_NAME)

	const isAlternateRight = variant === "alternate" && itemIndex % 2 === 1
	const status = getItemStatus(itemIndex, activeIndex)

	const contextValue: TimelineItemContextValue = {
		lineVariant,
		isAlternateRight,
		status,
		itemIndex,
		isLastItem,
		isFirstItem
	}

	return (
		<TimelineItemContext value={contextValue}>
			<li
				aria-current={status === "active" ? "step" : undefined}
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
	"relative z-10 flex size-(--timeline-bullet-size) shrink-0 items-center justify-center rounded-full border-2 bg-background",
	{
		variants: {
			status: {
				completed: "border-primary",
				active: "border-primary",
				pending: "border-border"
			},
			orientation: {
				vertical: "",
				horizontal: ""
			},
			variant: {
				linear: "",
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
			status: "pending",
			orientation: "vertical",
			variant: "linear",
			isAlternateRight: false
		}
	}
)

interface TimelineBulletProps {
	children?: React.ReactNode
	className?: string
}
function TimelineBullet({ children, className }: TimelineBulletProps) {
	const { variant, orientation } = useTimelineContext(BULLET_NAME)
	const { status, isAlternateRight } = useTimelineItemContext(BULLET_NAME)

	return (
		<div
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

const timelineConnectorVariants = cva("absolute z-0", {
	variants: {
		isCompleted: {
			true: "bg-primary",
			false: "bg-border"
		},
		orientation: {
			vertical: "",
			horizontal: ""
		},
		variant: {
			linear: "",
			alternate: ""
		},
		isAlternateRight: {
			true: "",
			false: ""
		},
		lineVariant: {
			solid: "border border-primary border-solid bg-transparent",
			dashed: "border border-primary border-dashed bg-transparent"
		}
	},
	compoundVariants: [
		{
			orientation: "vertical",
			variant: "linear",
			class:
				"start-[calc(var(--timeline-bullet-size)/2-var(--timeline-connector-width)/2)] top-3 h-full w-(--timeline-connector-width)"
		},
		{
			orientation: "horizontal",
			variant: "linear",
			class:
				"start-3 top-[calc(var(--timeline-bullet-size)/2-var(--timeline-connector-width)/2)] h-(--timeline-connector-width) w-full"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			isAlternateRight: false,
			class:
				"top-2 -right-[calc(var(--timeline-connector-width)/2)] h-full w-(--timeline-connector-width)"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			isAlternateRight: true,
			class:
				"top-2 -left-[calc(var(--timeline-connector-width)/2)] h-full w-(--timeline-connector-width)"
		},
		{
			orientation: "horizontal",
			variant: "alternate",
			class:
				"top-[calc(var(--timeline-bullet-size)/2-var(--timeline-connector-thickness)/2)] left-3 row-start-2 h-(--timeline-connector-thickness) w-full"
		}
	],
	defaultVariants: {
		isCompleted: false,
		orientation: "vertical",
		variant: "linear",
		isAlternateRight: false
	}
})

interface TimelineConnectorProps extends React.PropsWithChildren {
	className?: string
	forceMount?: boolean
}

function TimelineConnector({
	forceMount = false,
	className,
	children
}: TimelineConnectorProps) {
	const { activeIndex, orientation, variant, isReverse } =
		useTimelineContext(CONNECTOR_NAME)
	const { isAlternateRight, itemIndex, lineVariant, status, isLastItem, isFirstItem } =
		useTimelineItemContext(CONNECTOR_NAME)

	const nextItemIndex = itemIndex + 1
	const nextItemStatus = isLastItem ? null : getItemStatus(nextItemIndex, activeIndex)

	const reverseNextItemIndex = itemIndex
	const reverseNextItemStatus = getItemStatus(reverseNextItemIndex, activeIndex)

	if (isReverse && !forceMount && isFirstItem) return null
	if (!isReverse && !forceMount && isLastItem) return null

	const isConnectorCompleted = !isReverse
		? nextItemStatus === "completed" || nextItemStatus === "active"
		: reverseNextItemStatus === "completed" || reverseNextItemStatus === "active"

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
		>
			{children}
		</div>
	)
}

const timelineContentVariants = cva("flex-1", {
	variants: {
		orientation: {
			vertical: "",
			horizontal: ""
		},
		variant: {
			linear: "",
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
			variant: "linear",
			class: "pb-15"
		},
		{
			variant: "alternate",
			orientation: "vertical",
			isAlternateRight: false,
			class: "text-right"
		},
		{
			variant: "alternate",
			orientation: "horizontal",
			isAlternateRight: false,
			class: "row-start-3 pt-2"
		},
		{
			variant: "alternate",
			orientation: "horizontal",
			isAlternateRight: true,
			class: "row-start-1 pb-2"
		}
	],
	defaultVariants: {
		orientation: "vertical",
		variant: "linear",
		isAlternateRight: false
	}
})

interface TimelineContentProps {
	children?: React.ReactNode
	className?: string
}

function TimelineContent({ children, className }: TimelineContentProps) {
	const { variant, orientation } = useTimelineContext(CONTENT_NAME)
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
					className
				})
			)}
		>
			{children}
		</div>
	)
}

export { Timeline, TimelineItem, TimelineBullet, TimelineConnector, TimelineContent }
