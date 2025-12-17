"use client"

import { useEffect, useState } from "react"

import { useNetworkStatus } from "@/registry/use-network-status"

export function NetworkStatusDemo() {
	// Workaround to make it work in SSR
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])
	if (!mounted) return <div>Loading...</div>

	return (
		<section className="flex flex-col gap-2">
			<p className="font-medium text-xl">useNetworkStatus</p>
			<NetworkInformation />
		</section>
	)
}

// recommended to use this hook after component was rendered in client
// to avoid errors thrown by this hook.
function NetworkInformation() {
	const { online } = useNetworkStatus()

	return <p>Status: {online ? "Online" : "Offline"}</p>
}
