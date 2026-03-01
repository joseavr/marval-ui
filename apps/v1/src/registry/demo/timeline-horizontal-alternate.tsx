"use client"

import {
	Timeline,
	TimelineBullet,
	TimelineConnector,
	TimelineContent,
	TimelineItem
} from "@/registry/timeline"

const formatDate = (timestamp: number) => {
	const date = new Date(timestamp)
	console.log(date)

	const formatter = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true
	})

	const parts = formatter.formatToParts(date)

	const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
	return `${get("month")} ${get("day")}, ${get("year")} at ${get("hour")}:${get("minute")} ${get("dayPeriod")}`
}

const timelineItems = [
	{
		id: "1",
		title: "Project Kickoff",
		description: "Initial planning session and requirement alignment.",
		date: "2025-12-15T13:00:00.000Z",
		status: "completed"
	},
	{
		id: "2",
		title: "Design Phase",
		description: "Wireframes and design system setup.",
		date: "2026-01-01T15:00:00.000Z",
		status: "completed"
	},
	{
		id: "3",
		title: "Public Launch",
		description: "Release timeline component to production.",
		date: "2024-03-01T20:00:00.000Z",
		status: "upcoming"
	}
]

export function TimelineHorizontalAlternateDemo() {
	return (
		<div className="ml-55 flex">
			<Timeline variant="alternate" orientation="horizontal">
				{timelineItems.map((item) => (
					<TimelineItem key={item.id}>
						<TimelineBullet />
						<TimelineConnector />
						<TimelineContent className="w-50">
							<div className="text-muted-foreground text-xs">
								{formatDate(new Date(item.date).getTime())}
							</div>
							<div className="font-medium text-base">{item.title}</div>
							<div className="text-muted-foreground text-sm">{item.description}</div>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</div>
	)
}
