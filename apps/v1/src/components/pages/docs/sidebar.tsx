"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { sidebar_data } from "@/lib/config"
import { cn } from "@/lib/utils"

export function DocsSideBar() {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null)
	const pathname = usePathname()

	return (
		<aside
			data-id="docs-leftside"
			className="sticky top-(--header-height) flex h-[calc(100svh-var(--header-height)-var(--footer-height))] min-w-(--sidebar-width) max-w-(--sidebar-width) flex-1 flex-col pt-4 text-sm"
		>
			<ScrollArea>
				<nav
					className="flex flex-col gap-8"
					style={
						{
							"--icon-container-size": "1.25rem", // 20px
							"--icon-size": "0.75rem" // 12px
						} as React.CSSProperties
					}
				>
					{sidebar_data.map(({ items, groupLabel, icon: GroupIcon }) => (
						<ul key={groupLabel}>
							<p className="mb-2 inline-flex">
								<span className="relative flex items-center gap-2 text-muted-foreground">
									<span
										id="icon"
										className="flex size-(--icon-container-size) items-center justify-center rounded-sm bg-border [&_svg]:size-(--icon-size)"
									>
										{<GroupIcon className="fill-current stroke-2" />}
									</span>
									<span className="capitalize">{groupLabel}</span>
									<span
										id="thread-vertical-line"
										className="absolute top-full left-0 h-2 w-px translate-x-[calc(var(--icon-container-size)/2)] bg-border"
									/>
								</span>
							</p>
							{items.map((i) => {
								const isHovered = hoveredItem === i.url
								const isActive = pathname === i.url
								const isDisabled = Boolean(i.disabled)
								return (
									<li
										className="group"
										key={i.label}
										onMouseEnter={() => setHoveredItem(i.url ?? "")}
										onMouseLeave={() => setHoveredItem(null)}
									>
										<Button
											asChild
											variant={"link"}
											className={cn(
												"relative flex w-full justify-start p-2 pl-4 text-start text-accent-foreground/70 transition-colors hover:no-underline group-hover:font-medium group-hover:text-foreground",
												isDisabled &&
													"pointer-events-none select-none text-foreground opacity-50 hover:text-foreground"
											)}
											disabled={isDisabled}
										>
											<Link href={i.url} tabIndex={isDisabled ? -1 : undefined}>
												<span className="pl-3.5">{i.label}</span>
												<span
													id="thread-vertical-line"
													className="absolute inset-y-0 left-[calc(var(--icon-container-size)/2)] h-full w-px bg-border"
												/>
												<AnimatePresence initial={false} mode="wait">
													{isActive && (
														<motion.span
															layoutId="active-indicator-vertical-line"
															className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-[9px] z-11 h-[56%] w-[3px] rounded-full bg-primary"
															initial={{ opacity: 0 }}
															animate={{ opacity: 1 }}
															exit={{ opacity: 0 }}
															transition={{
																type: "spring",
																stiffness: 500,
																damping: 35
															}}
														/>
													)}
												</AnimatePresence>
												<AnimatePresence initial={false} mode="wait">
													{isHovered && (
														<motion.span
															layoutId="hover-indicator-vertical-line"
															className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-[9px] z-10 h-[56%] w-[3px] rounded-full bg-neutral-300 dark:bg-neutral-600"
															initial={{ opacity: 0 }}
															animate={{ opacity: 1 }}
															exit={{ opacity: 0 }}
															transition={{
																type: "spring",
																stiffness: 500,
																damping: 35
															}}
														/>
													)}
												</AnimatePresence>
											</Link>
										</Button>
									</li>
								)
							})}
						</ul>
					))}
					<div className="-bottom-1 sticky z-10 h-16 shrink-0 bg-gradient-to-t from-background via-background/80 to-background/50 blur-xs" />
				</nav>
			</ScrollArea>
		</aside>
	)
}
