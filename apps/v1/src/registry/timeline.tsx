import { cva } from "class-variance-authority"
import React, { createContext, useContext } from "react"

import { cn } from "@/lib/utils"

// export function TimelineDemo() {
//   return (
//     <Timeline active={1} bulletSize={24} lineWidth={2}>
//       <TimelineItem title="New branch" bullet={<IconGitBranch size={12} />} >
//         {/* <Text c="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
//         <Text size="xs" mt={4}>2 hours ago</Text> */}
//       </TimelineItem>

//       <TimelineItem title="Commits" bullet={<IconGitCommit size={12} />} >
//         {/* <Text c="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
//         <Text size="xs" mt={4}>52 minutes ago</Text> */}
//       </TimelineItem>

//       <TimelineItem title="Pull request" bullet={<IconGitPullRequest size={12} />} lineVariant="dashed">
//         {/* <Text c="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
//         <Text size="xs" mt={4}>34 minutes ago</Text> */}
//       </TimelineItem>

//       <TimelineItem title="Code review" bullet={<IconMessageDots size={12} />}>
//         {/* <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
//         <Text size="xs" mt={4}>12 minutes ago</Text> */}
//       </TimelineItem>
//     </Timeline>
//   )
// }

type ItemStatus = "pending" | "active" | "completed"

function getItemStatus(itemIndex: number, activeIndex: number | undefined): ItemStatus {
	if (activeIndex === undefined) return "pending"
	if (itemIndex < activeIndex) return "completed"
	if (itemIndex === activeIndex) return "active"
	return "pending"
}

const ROOT_NAME = "Timeline"
const ITEM_NAME = "TimelineItem"
const BULLET_NAME = "TimelineDot"
const CONNECTOR_NAME = "TimelineConnector"
const CONTENT_NAME = "TimelineContent"

type TimelineContextValue = {
	activeIndex: TimelineProps["activeIndex"]
	orientation: TimelineProps["orientation"]
	variant: TimelineProps["variant"]
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
		}
	},
	compoundVariants: [
		{
			orientation: "vertical",
			variant: "linear",
			class: "gap-6"
		},
		{
			orientation: "horizontal",
			variant: "linear",
			class: "[&>div]:pr-8"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			class: "relative w-full gap-3"
		},
		{
			orientation: "horizontal",
			variant: "alternate",
			class: "items-center gap-4"
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
}

function Timeline({
	children,
	activeIndex,
	orientation,
	variant = "linear",
	bulletSize,
	lineWidth,
	className
}: TimelineProps) {
	const contextValue: TimelineContextValue = {
		activeIndex,
		orientation,
		variant
	}

	const items = React.Children.map(children, (item, index) => {
		if (!React.isValidElement<{ itemIndex: number; isLastItem: boolean }>(item))
			throw new Error("Children must be an Component or React Element")
		if (!Array.isArray(children))
			throw new Error("Children must be an array of Component or React Element")
		if (item.type !== TimelineItem)
			throw new Error("The direct children must be an Array of TimelineItem")
		return React.cloneElement(item, {
			itemIndex: index,
			isLastItem: index === children.length - 1
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
						"--timeline-bullet-size": CSS.px(bulletSize ?? 2),
						"--timeline-connector-width": CSS.px(lineWidth ?? 14)
					} as React.CSSProperties
				}
				className={cn(
					// "*:not-last:pr-8",
					"*:not-last:pr-8",
					timelineVariants({
						orientation,
						variant,
						className
					})
				)}
			>
				{items}
			</ul>
		</TimelineContext>
	)
}

const timelineItemVariants = cva("relative flex", {
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
			class: "gap-3 pb-8 last:pb-0"
		},
		{
			orientation: "horizontal",
			variant: "linear",
			class: "flex-col gap-3"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			isAlternateRight: false,
			class: "w-1/2 gap-3 pr-6 pb-12 last:pb-0"
		},
		{
			orientation: "vertical",
			variant: "alternate",
			isAlternateRight: true,
			class: "ml-auto w-1/2 flex-row-reverse gap-3 pb-12 pl-6 last:pb-0"
		},
		{
			orientation: "horizontal",
			variant: "alternate",
			class: "grid min-w-0 grid-rows-[1fr_auto_1fr] gap-3"
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
}
function TimelineItem(props: TimelineItemProps) {
	return <TimelineItemInternal {...(props as TimelineItemInternalProps)} />
}

function TimelineItemInternal({
	lineVariant = "solid",
	className,
	itemIndex,
	isLastItem,
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
		isLastItem
	}

	return (
		<TimelineItemContext value={contextValue}>
			<li
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
			solid: "border-solid",
			dashed: "border-dashed"
		}
	},
	compoundVariants: [
		{
			orientation: "vertical",
			variant: "linear",
			class:
				"start-[calc(var(--timeline-bullet-size)/2-var(--timeline-connector-width)/2)] top-3 h-[calc(100%+0.5rem)] w-(--timeline-connector-width)"
		},
		{
			orientation: "horizontal",
			variant: "linear",
			class:
				"start-3 top-[calc(var(--timeline-bullet-size)/2-var(--timeline-connector-width)/2)] h-(--timeline-connector-width) w-[calc(100%+0.5rem)]"
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
				"top-[calc(var(--timeline-bullet-size)/2-var(--timeline-connector-thickness)/2)] left-3 row-start-2 h-(--timeline-connector-thickness) w-[calc(100%+0.5rem)]"
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
	const { activeIndex, orientation, variant } = useTimelineContext(CONNECTOR_NAME)
	const { isAlternateRight, itemIndex, isLastItem, lineVariant } =
		useTimelineItemContext(CONNECTOR_NAME)

	const nextItemIndex = itemIndex + 1
	const nextItemStatus = isLastItem ? null : getItemStatus(nextItemIndex, activeIndex)

	if (!forceMount && isLastItem) return null

	const isConnectorCompleted =
		nextItemStatus === "completed" || nextItemStatus === "active"

	return (
		<div
			data-slot="timeline-connector"
			aria-hidden="true"
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
