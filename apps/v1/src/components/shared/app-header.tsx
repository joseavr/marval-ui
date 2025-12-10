import Link from "next/link"

import { Search } from "@/components/pages/docs/search"
import { Container } from "@/components/shared/page-container"

export function AppHeader() {
	return (
		<header className="sticky top-0 z-30 w-full bg-transparent backdrop-blur-sm">
			<Container>
				<div className="h-(--header-height)">
					<div className="flex h-8 items-start justify-between pt-3">
						<Link href="/" className="h-8 font-bold text-xl">
							marval ui
						</Link>
						<Search />
					</div>
				</div>
			</Container>
		</header>
	)
}
