"use client"

import { useEffect, useRef, useState } from "react"

import { store } from "./store"
import "./consolex.css"

export function ConsoleXProvider(props: {
	defaultOpen?: boolean
	style?: React.CSSProperties
}) {
	const [logs, setLogs] = useState(store.get())
	const [open, setOpen] = useState(false)
	const [pos, setPos] = useState({ x: 20, y: 0 })
	const [mounted, setMounted] = useState(false)
	const triggerRef = useRef<HTMLButtonElement>(null)
	const didDragRef = useRef(false)

	useEffect(() => {
		store.subscribe(() => setLogs([...store.get()]))
	}, [])

	useEffect(() => {
		setPos((p) => ({ ...p, y: window.innerHeight - 80 }))
		setMounted(true)
	}, [])

	useEffect(() => {
		function fixPosition() {
			if (!triggerRef.current) return
			setPos((p) => clampToViewport(p.x, p.y, triggerRef.current!))
		}

		window.addEventListener("resize", fixPosition)
		return () => window.removeEventListener("resize", fixPosition)
	}, [])

	if (process.env.NODE_ENV !== "development") return null
	if (!mounted) return null

	const DRAG_THRESHOLD_PX = 3

	const onDrag = (e: React.MouseEvent) => {
		didDragRef.current = false
		const startX = e.clientX - pos.x
		const startY = e.clientY - pos.y
		const startClientX = e.clientX
		const startClientY = e.clientY

		const move = (ev: MouseEvent) => {
			if (!triggerRef.current) return

			const deltaX = ev.clientX - startClientX
			const deltaY = ev.clientY - startClientY
			if (Math.abs(deltaX) > DRAG_THRESHOLD_PX || Math.abs(deltaY) > DRAG_THRESHOLD_PX) {
				didDragRef.current = true
			}

			const rawX = ev.clientX - startX
			const rawY = ev.clientY - startY

			const clamped = clampToViewport(rawX, rawY, triggerRef.current)
			setPos(clamped)
		}

		const up = () => {
			window.removeEventListener("mousemove", move)
			window.removeEventListener("mouseup", up)
		}

		window.addEventListener("mousemove", move)
		window.addEventListener("mouseup", up)
	}

	const onTriggerClick = (e: React.MouseEvent) => {
		if (didDragRef.current) {
			e.preventDefault()
			return
		}
		setOpen((o) => !o)
	}

	return (
		<div className="cx-root" style={props.style}>
			{/* Floating Trigger */}
			<button
				ref={triggerRef}
				type="button"
				className="cx-trigger"
				style={{ left: pos.x, top: pos.y }}
				onMouseDown={onDrag}
				onClick={onTriggerClick}
			>
				CX {logs.length}
			</button>

			{open && (
				<div className="cx-panel">
					<header>
						<strong>ConsoleX</strong>
						<button type="button" onClick={() => store.clear()}>
							clear
						</button>
					</header>

					<div className="cx-logs">
						{logs.map((log) => (
							<LogRow key={log.id} log={log} />
						))}
					</div>
				</div>
			)}
		</div>
	)
}

function LogRow({ log }: any) {
	const [open, setOpen] = useState(false)
	return (
		<div className="cx-log group" data-open={open ? open : undefined}>
			<div className="cx-meta">
				<button className="collapsible" type="button" onClick={() => setOpen((o) => !o)}>
					<span className="cx-expand">
						<ArrowDownIcon />
					</span>
					{log.component && <span className="cx-component">[{log.component}]</span>}
					<span>{new Date(log.time).toLocaleTimeString()}</span>
					{log.label && <span className="cx-label">{log.label}</span>}
					<span className="cx-preview">{log.preview}</span>
				</button>
				<button
					className="cx-copy"
					type="button"
					onClick={() => navigator.clipboard.writeText(JSON.stringify(log.data, null, 2))}
				>
					<CopyIcon />
				</button>
			</div>

			{open && (
				<div className="cx-details">
					<pre>{JSON.stringify(log.data, null, 2)}</pre>
					{log.stack && <pre className="cx-stack">{log.stack}</pre>}
				</div>
			)}
		</div>
	)
}

function ArrowDownIcon() {
	return (
		<svg
			fill="none"
			height="24"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Arrow Down Icon</title>
			<path d="m9 18 6-6-6-6" />
		</svg>
	)
}

function CopyIcon() {
	return (
		<svg
			fill="none"
			height="24"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Copy</title>
			<rect height="4" rx="1" ry="1" width="8" x="8" y="2" />
			<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
		</svg>
	)
}

function clampToViewport(x: number, y: number, el: HTMLElement) {
	const rect = el.getBoundingClientRect()

	const maxX = window.innerWidth - rect.width
	const maxY = window.innerHeight - rect.height

	return {
		x: Math.min(Math.max(0, x), maxX),
		y: Math.min(Math.max(0, y), maxY)
	}
}
