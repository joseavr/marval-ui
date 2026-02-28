"use client"

import { Check, Circle, Package, Truck } from "lucide-react"

import {
	Timeline,
	TimelineBullet,
	TimelineConnector,
	TimelineContent,
	TimelineItem
} from "@/registry/timeline"

const timelineItems = [
	{
		id: "order-confirmed",
		title: "Order confirmed",
		description: "Your order and payment have been received.",
		time: "2 days ago",
		status: "completed",
		Icon: <Check className="size-4" />
	},
	{
		id: "packed",
		title: "Packed",
		description: "Your items have been packed and labeled.",
		time: "1 day ago",
		status: "completed",
		Icon: <Package className="size-4" />
	},
	{
		id: "in-transit",
		title: "In transit",
		description: "Your package is on its way to you.",
		time: "Now",
		status: "current",
		Icon: <Truck className="size-4" />
	},
	{
		id: "delivered",
		title: "Delivered",
		description: "Estimated delivery tomorrow.",
		time: undefined,
		status: "upcoming",
		Icon: <Circle className="size-4" />
	}
]

export function TimelineBulletDemo() {
	// If the API sends out the status field,
	// just find the index of the active item.
	// The Root component will handle the styles.
	const activeIndex = timelineItems.findIndex((item) => item.status === "current")

	return (
		<div>
			<Timeline activeIndex={activeIndex} bulletSize={34} lineWidth={3}>
				{timelineItems.map((item) => (
					<TimelineItem key={item.id}>
						<TimelineBullet
							className={
								item.status === "current" || item.status === "completed"
									? "bg-primary"
									: ""
							}
						>
							{item.Icon}
						</TimelineBullet>
						<TimelineConnector variant={item.status === "current" ? "dashed" : "solid"} />
						<TimelineContent>
							<div className="font-medium text-md">{item.title}</div>
							<div className="text-muted-foreground text-sm">{item.description}</div>
							<div className="text-muted-foreground text-xs">{item.time}</div>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</div>
	)
}
