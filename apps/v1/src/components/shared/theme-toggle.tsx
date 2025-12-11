/** biome-ignore-all lint/a11y/noStaticElementInteractions: theme toggle requires interactive elements */
"use client"

import { Laptop02, Moon01, Sun } from "@untitledui/icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useAnimatedHoverBox } from "@/hooks/use-animated-hover-box"
import { cn } from "@/lib/utils"

// How to calculate border radius of an outer box and inner box
	// pick outer-h: 32px
	// pick outer-p: 2px
	// pick outer-r: 10px
	// pick outer-border: 1px
	// calculate inner-r: (outer-r) - (outer-p) = 10px - 2px = 8px
	// calculate inner-h = outer-h - outer-border(top) - outer-border(bottom) - outer-p(top) - outer-p(bottom) = 26px

type Theme = "system" | "light" | "dark" | "default"

const initialActiveHoverBoxPositions: Record<
	Theme,
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
	},
	default: {
		"--left": "2px",
		"--top": "15px",
		"--width": "26px",
		"--height": "26px",
		"--box-border-radius": "30px"
	}
} as const

export function ThemeToggle() {
	const {
		activeHoverBoxRef,
		hoverBoxRef,
		parentElementRef,
		handleMouseEnterOnItem,
		handleMouseLeaveOnItem,
		handleClickActiveHoverOnItem
	} = useAnimatedHoverBox()

	const { theme, setTheme } = useTheme()

	const initialHoverBoxPositionStyle = theme
		? initialActiveHoverBoxPositions[theme as Theme]
		: initialActiveHoverBoxPositions.default

	const handleThemeChange =
		(newTheme: "system" | "light" | "dark") =>
		(e: React.MouseEvent<HTMLButtonElement>) => {
			handleClickActiveHoverOnItem(e)
			setTheme(newTheme)
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
				onMouseEnter={handleMouseEnterOnItem}
				onMouseLeave={handleMouseLeaveOnItem}
				variant="ghost"
				size="icon-sm"
				onClick={handleThemeChange("system")}
				className={cn(
					"group relative z-20 size-[26px] rounded-[calc(var(--radius-4xl)-2px)] hover:bg-accent/0!"
				)}
			>
				<Laptop02 />
			</Button>
			<Button
				onMouseEnter={handleMouseEnterOnItem}
				onMouseLeave={handleMouseLeaveOnItem}
				variant="ghost"
				size="icon-sm"
				onClick={handleThemeChange("light")}
				className={cn(
					"group relative z-20 size-[26px] rounded-[calc(var(--radius-4xl)-2px)] hover:bg-accent/0!"
				)}
			>
				<Sun />
			</Button>
			<Button
				onMouseEnter={handleMouseEnterOnItem}
				onMouseLeave={handleMouseLeaveOnItem}
				variant="ghost"
				size="icon-sm"
				onClick={handleThemeChange("dark")}
				className={cn(
					"group relative z-20 size-[26px] rounded-[calc(var(--radius-4xl)-2px)] hover:bg-accent/0!"
				)}
			>
				<Moon01 />
			</Button>
		</div>
	)
}
