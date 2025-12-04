import type { Metadata } from "next"
import "@/styles/globals.css"

import { Outfit } from "next/font/google"

import { TailwindIndicator } from "@/components/ui/tailwind-indicator"

export const metadata: Metadata = {
	title: "Marval UI",
	description: "Marval UI Component Library"
}

const outfit = Outfit({
	weight: ["400", "500"],
	subsets: ["latin"]
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={outfit.className}>
			<body>
				{children}
				<TailwindIndicator align="bottom-right" />
			</body>
		</html>
	)
}
