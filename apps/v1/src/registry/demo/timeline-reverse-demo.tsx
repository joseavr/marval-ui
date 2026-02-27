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
		id: "1.0.0",
		dateTime: "2025-12-14",
		date: "Dec 14, 2025",
		version: "1.0.0",
		title: "Components",
		description: `
    <ul>
      <li> New Radix UI \`CopyButton\` component.</li>
      <li> New Radix UI \`Button\` component.</li>
      <li> New Radix UI \`FileUpload\` components to add the \`followCursor\` and \`followCursorSpringOptions\` props.</li>
      <li> New Radix UI \`SortableList\` components to add the \`followCursor\` and \`followCursorSpringOptions\` props.</li>
    </ul>
    `
	},
	{
		id: "1.5.0",
		dateTime: "2026-01-01",
		date: "Jan 1, 2025",
		version: "1.5.0",
		title: "Hooks",
		description: `
    <ul>
      <li> Added new hook \`useNetworkStatus\`. </li>
      <li> Added new snippet \`Typescript Cheatsheet\`. </li>
    </ul>
    `
	},
	{
		id: "2.0.0",
		dateTime: "2026-02-15",
		date: "Feb 15, 2025",
		version: "2.0.0",
		title: "Components",
		description: `
    <ul>
      <li> New Radix UI \`Timeline\` component. </li>
      <li> Update of the Radix UI \`FileUpload\` component to add new styles </li>
    </ul>
    `
	}
]

export function TimelineReverseDemo() {
	return (
		<Timeline reverse activeIndex={2}>
			{timelineItems.map((item) => (
				<TimelineItem key={item.id}>
					<div className="relative h-auto w-28 shrink-0 max-sm:mb-2">{item.date}</div>
					<div className="relative h-auto w-auto">
						<TimelineBullet className="mt-1" />
						<TimelineConnector className="mt-1" />
					</div>
					<TimelineContent className="flex flex-col gap-2">
						<div className="w-fit rounded-lg border border-border bg-accent px-1.5 py-0.5 text-sm">
							{item.version}
						</div>
						<div className="font-semibold text-lg">{item.title}</div>
						<div
							className="prose"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: Demo purposes
							dangerouslySetInnerHTML={{ __html: item.description }}
						/>
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	)
}
