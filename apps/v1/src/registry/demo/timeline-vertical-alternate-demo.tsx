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
		id: "1",
		title: "Project Kickoff",
		description: "Initial planning session and requirement alignment.",
		date: "2025-12-15T10:00:00.000Z",
		status: "completed"
	},
	{
		id: "2",
		title: "Design Phase",
		description: "Wireframes, design system setup, and component mapping.",
		date: "2026-01-01T08:00:00.000Z",
		status: "completed"
	},
	{
		id: "3",
		title: "Core Development",
		description: "Build timeline engine, animations, and data bindings.",
		date: "2026-02-10T06:00:00.000Z",
		status: "in-progress"
	},
	{
		id: "4",
		title: "Testing & QA",
		description: "Unit testing, integration testing, and performance checks.",
		date: "2026-02-20T04:00:00.000Z",
		status: "upcoming"
	},
	{
		id: "5",
		title: "Public Launch",
		description: "Release timeline component to production.",
		date: "2024-03-01T10:00:00.000Z",
		status: "upcoming"
	}
]

export function TimelineVerticalAlternateDemo() {
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

	return (
		<div>
			<Timeline variant="alternate">
				{timelineItems.map((item) => (
					<TimelineItem key={item.id}>
						<TimelineBullet />
						<TimelineConnector />
						<TimelineContent>
							<div className="text-muted-foreground text-xs">
								{formatDate(new Date(item.date).getTime())}
							</div>
							<div className="font-medium">{item.title}</div>
							<div className="text-md text-muted-foreground">{item.description}</div>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</div>
	)
}
