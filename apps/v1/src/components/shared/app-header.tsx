import Link from "next/link"

import { CommandMenu } from "@/components/pages/docs/command-menu"
import { GitHubLink } from "@/components/shared/github-link"
import { LayoutToggle } from "@/components/shared/layout-toggle"
import { Container } from "@/components/shared/page-container"
import { source } from "@/lib/fumadocs"

export function AppHeader() {
	const pageTree = source.pageTree

	return (
		<header className="sticky top-0 z-30 w-full bg-transparent backdrop-blur-sm">
			<Container>
				<div className="h-(--header-height)">
					<div className="flex h-8 items-start justify-between pt-3">
						<div data-id="left-content">
							<Link href="/" className="h-8 font-bold text-xl">
								marval ui
							</Link>
						</div>

						<div
							data-id="right-content"
							className="hidden w-full flex-1 gap-3 md:flex md:w-auto md:flex-none"
						>
							{/* TODO: add more features */}
							{/* <CommandMenu tree={pageTree} /> */}
							<LayoutToggle variant="ghost" size="icon" />
							<GitHubLink variant="ghost" size="icon" />
						</div>
					</div>
				</div>
			</Container>
		</header>
	)
}
