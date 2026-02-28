"use client"

import {
	Timeline,
	TimelineBullet,
	TimelineConnector,
	TimelineContent,
	TimelineItem
} from "@/registry/timeline"

const timelineItems = [
	{
		id: "step-1",
		title: "Step 1",
		description: "Create account",
		status: "completed"
	},
	{
		id: "step-2",
		title: "Step 2",
		description: "Verify email",
		status: "current"
	},
	{
		id: "step-3",
		title: "Step 3",
		description: "Complete profile",
		status: "upcoming"
	},
	{
		id: "step-4",
		title: "Step 4",
		description: "Get started",
		status: "upcoming"
	}
]

export function TimelineHorizontalDemo() {
	return (
		<div>
			<Timeline orientation="horizontal">
				{timelineItems.map((item) => (
					<TimelineItem key={item.id}>
						<TimelineBullet />
						<TimelineConnector />
						<TimelineContent>
							<div className="font-medium text-lg">{item.title}</div>
							<div className="text-muted-foreground">{item.description}</div>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</div>
	)
}
