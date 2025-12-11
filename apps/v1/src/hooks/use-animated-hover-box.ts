import { useRef } from "react"

export function useAnimatedHoverBox() {
	const activeHoverBoxRef = useRef<HTMLDivElement>(null)
	const hoverBoxRef = useRef<HTMLSpanElement>(null)
	const parentElementRef = useRef<HTMLDivElement>(null)

	const handleMouseEnterOnItem = (e: React.MouseEvent<HTMLButtonElement>) => {
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

	const handleMouseLeaveOnItem = () => {
		const hoverBox = hoverBoxRef.current
		if (!hoverBox) return

		hoverBox.style.opacity = "0"
		hoverBox.style.visibility = "hidden"
	}

	const handleClickActiveHoverOnItem = (e: React.MouseEvent<HTMLButtonElement>) => {
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

	return {
		activeHoverBoxRef,
		hoverBoxRef,
		parentElementRef,
		handleMouseEnterOnItem,
		handleMouseLeaveOnItem,
		handleClickActiveHoverOnItem
	}
}
