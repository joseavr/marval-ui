"use client"

import { useComponentPreviewDemoContext } from "@/components/shared/component-preview"
import {
	Timeline,
	TimelineBullet,
	TimelineConnector,
	TimelineContent,
	TimelineItem
} from "@/registry/timeline"

const timelineItems = [
	{
		id: "new-branch",
		dateTime: "2 hours ago",
		title: "New Branch",
		description: "You've created new branch fix-notifications from master"
	},
	{
		id: "commits",
		dateTime: "52 minutes ago",
		title: "Commits",
		description: "You've pushed 23 commits to fix-notifications branch"
	},
	{
		id: "pull-request",
		dateTime: "34 minutes ago",
		title: "Pull Request",
		description:
			"You've submitted a pull request Fix incorrect notification message (#187)"
	},
	{
		id: "code-review",
		dateTime: "12 minutes ago",
		title: "Code Review",
		description: "John Wick left a code review on your pull request"
	}
]

export function TimelineDemo() {
	const { state } = useComponentPreviewDemoContext()
	const { activeIndex, lineWidth, bulletSize, reverse, orientation, variant } = state

	return (
		<div className="mt-20 max-w-sm">
			<Timeline
				activeIndex={(activeIndex ?? undefined) as number}
				lineWidth={lineWidth as number}
				bulletSize={bulletSize as number}
				reverse={reverse as boolean}
				orientation={orientation as React.ComponentProps<typeof Timeline>["orientation"]}
				variant={variant as React.ComponentProps<typeof Timeline>["variant"]}
			>
				{timelineItems.map((item, index) => (
					<TimelineItem key={item.id}>
						<TimelineBullet />
						<TimelineConnector
							variant={
								(!reverse && index === timelineItems.length - 2 && "dashed") ||
								(reverse && index === timelineItems.length - 1 && "dashed") ||
								"solid"
							}
						/>
						<TimelineContent className="flex max-w-68 flex-col gap-1">
							<div className="-mt-1 font-medium text-lg">{item.title}</div>
							<div className="text-muted-foreground text-sm">{item.description}</div>
							<div className="text-xs">{item.dateTime}</div>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</div>
	)
}
