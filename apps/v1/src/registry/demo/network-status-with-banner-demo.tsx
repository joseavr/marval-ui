"use client"

import { useEffect, useRef, useState } from "react"

import { useNetworkStatus } from "@/registry/use-network-status"

export function NetworkStatusWithBannerDemo() {
	// Workaround to make it work in SSR
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) return <div>Loading...</div>

	return (
		<section className="flex flex-col gap-2">
			<p className="font-medium text-xl">useNetworkStatus</p>
			{mounted && <NetworkInformation />}
		</section>
	)
}

function NetworkInformation() {
	const { online } = useNetworkStatus()
	const prevNetworkStatusRef = useRef<boolean | null>(null)
	const [showBanner, setShowBanner] = useState(false)

	useEffect(() => {
		let timeoutId: NodeJS.Timeout

		// if prev status differs from current, show banner
		if (
			prevNetworkStatusRef.current !== null &&
			prevNetworkStatusRef.current !== online
		) {
			setShowBanner(true)

			// Hide after 5 seconds
			timeoutId = setTimeout(() => {
				setShowBanner(false)
			}, 5000)
		}

		// Update the previous value
		prevNetworkStatusRef.current = online

		return () => clearTimeout(timeoutId)
	}, [online])

	return (
		<div className="flex gap-1">
			<p className="font-medium text-neutral-500 tracking-tight">{`Current status:`}</p>
			<p>{`${online}`}</p>
			<NetworkStatusBanner data-show={showBanner} data-online={online} status={online} />
		</div>
	)
}

function NetworkStatusBanner({
	status,
	...props
}: React.ComponentProps<"div"> & { status: boolean }) {
	return (
		<div
			{...props}
			className="fixed bottom-0 left-0 z-20 flex h-7 w-full items-center justify-center text-white transition data-[show=false]:translate-y-[40px] data-[show=true]:translate-y-0 data-[online=false]:bg-red-500 data-[online=true]:bg-green-500 data-[show=false]:opacity-0 data-[show=true]:opacity-100"
		>
			<div>{status ? "Back online" : "No internet connection"}</div>
		</div>
	)
}
