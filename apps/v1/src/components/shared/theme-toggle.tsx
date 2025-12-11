/** biome-ignore-all lint/a11y/noStaticElementInteractions: theme toggle requires interactive elements */
"use client"

import { Laptop02, Moon01, Sun } from "@untitledui/icons"
import { useTheme } from "next-themes"
import { useRef } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// How to calculate border radius of an outer box and inner box
// pick outer-h: 32px
// pick outer-p: 2px
// pick outer-r: 10px
// pick outer-border: 1px
// calculate inner-r: (outer-r) - (outer-p) = 10px - 2px = 8px
// calculate inner-h = outer-h - outer-border(top) - outer-border(bottom) - outer-p(top) - outer-p(bottom) = 26px

const initialActiveHoverBoxPositions: Record<
	string,
	React.CSSProperties & Record<`--${string}`, string>
> = {
	system: {
		"--left": "2px",
		"--top": "15px",
		"--width": "26px",
		"--height": "26px",
		"--box-border-radius": "30px",
		opacity: "1",
		visibility: "visible"
	},
	light: {
		"--left": "28px",
		"--top": "15px",
		"--width": "26px",
		"--height": "26px",
		"--box-border-radius": "30px",
		opacity: "1",
		visibility: "visible"
	},
	dark: {
		"--left": "54px",
		"--top": "15px",
		"--width": "26px",
		"--height": "26px",
		"--box-border-radius": "30px",
		opacity: "1",
		visibility: "visible"
	}
}

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const initialHoverBoxPositionStyle = theme
		? initialActiveHoverBoxPositions[theme]
		: {
				"--left": "2px",
				"--top": "15px",
				"--width": "26px",
				"--height": "26px",
				"--box-border-radius": "30px"
			}
	const activeHoverBoxRef = useRef<HTMLDivElement>(null)
	const hoverBoxRef = useRef<HTMLSpanElement>(null)
	const parentElementRef = useRef<HTMLDivElement>(null)

	const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
		// get element offset from viewport
		const { top, left, height, width } = e.currentTarget.getBoundingClientRect()

		const parentElement = parentElementRef.current
		const hoverBox = hoverBoxRef.current

		if (!parentElement || !hoverBox) return

		const { left: navleft } = parentElement.getBoundingClientRect()

		hoverBox.style.setProperty("--left", `${left - navleft - 1}px`)
		hoverBox.style.setProperty("--top", `${top}px`)
		hoverBox.style.setProperty("--width", `${width}px`)
		hoverBox.style.setProperty("--height", `${height}px`)
		hoverBox.style.setProperty("--box-border-radius", "30px")
		hoverBox.style.opacity = "1"
		hoverBox.style.visibility = "visible"
	}

	const handleMouseLeave = () => {
		const hoverBox = hoverBoxRef.current
		if (!hoverBox) return

		hoverBox.style.opacity = "0"
		hoverBox.style.visibility = "hidden"
	}

	const handleClickActiveHover = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { top, left, height, width } = e.currentTarget.getBoundingClientRect()

		const parentElement = parentElementRef.current
		const activeHoverBox = activeHoverBoxRef.current

		if (!parentElement || !activeHoverBox) return

		const { left: navleft } = parentElement.getBoundingClientRect()

		activeHoverBox.style.setProperty("--left", `${left - navleft - 1}px`)
		activeHoverBox.style.setProperty("--top", `${top}px`)
		activeHoverBox.style.setProperty("--width", `${width}px`)
		activeHoverBox.style.setProperty("--height", `${height}px`)
		activeHoverBox.style.setProperty("--box-border-radius", "30px")
		activeHoverBox.style.opacity = "1"
		activeHoverBox.style.visibility = "visible"
	}

	return (
		<div
			ref={parentElementRef}
			className="relative flex h-8 flex-row items-center justify-center gap-0 rounded-4xl border border-border p-0.5"
		>
			{/* <!-- Hover box backdrop --> */}
			<span
				ref={hoverBoxRef}
				className="absolute bottom-[calc(17px)] left-0 z-10 h-(--height) w-(--width) translate-x-(--left) translate-y-(--top) rounded-(--box-border-radius) bg-accent opacity-0 backdrop-blur-lg transition-all duration-300 ease-in-out dark:bg-white/10"
				style={
					{
						"--left": "0px",
						"--top": "15px",
						"--box-border-radius": "30px"
					} as React.CSSProperties
				} // setting variables for initial position
			/>

			{/* <!-- Active Hover box backdrop --> */}
			<span
				ref={activeHoverBoxRef}
				className={cn(
					"absolute bottom-[calc(17px)] left-0 z-10 h-(--height) w-(--width) translate-x-(--left) translate-y-(--top) rounded-(--box-border-radius) bg-accent opacity-0 backdrop-blur-lg transition-all duration-300 ease-in-out dark:bg-white/10"
				)}
				style={initialHoverBoxPositionStyle as React.CSSProperties} // setting variables for initial position
			/>

			<Button
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				variant="ghost"
				size="icon-sm"
				onClick={(e) => {
					handleClickActiveHover(e)
					setTheme("system")
				}}
				className={cn(
					"group relative z-20 size-[26px] rounded-[calc(var(--radius-4xl)-2px)] hover:bg-accent/0!"
				)}
			>
				<Laptop02 />
			</Button>
			<Button
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				variant="ghost"
				size="icon-sm"
				onClick={(e) => {
					handleClickActiveHover(e)
					setTheme("light")
				}}
				className={cn(
					"group relative z-20 size-[26px] rounded-[calc(var(--radius-4xl)-2px)] hover:bg-accent/0!"
				)}
			>
				<Sun />
			</Button>
			<Button
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				variant="ghost"
				size="icon-sm"
				onClick={(e) => {
					handleClickActiveHover(e)
					setTheme("dark")
				}}
				className={cn(
					"group relative z-20 size-[26px] rounded-[calc(var(--radius-4xl)-2px)] hover:bg-accent/0!"
				)}
			>
				<Moon01 />
			</Button>
		</div>
	)
}
