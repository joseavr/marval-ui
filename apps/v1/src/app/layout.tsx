import type { Metadata } from "next"
import "@/styles/globals.css"

import { Outfit } from "next/font/google"

import { Providers } from "@/components/shared/app-providers"
import { TailwindIndicator } from "@/components/shared/tailwind-indicator"
import { cn } from "@/lib/utils"

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
		<html
			lang="en"
			className={cn(outfit.className, "light")}
			style={{ colorScheme: "light" }}
		>
			<body>
				<Providers>{children}</Providers>
				<TailwindIndicator align="bottom-right" />
			</body>
		</html>
	)
}
