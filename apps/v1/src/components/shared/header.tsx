import { Search } from "@/components/pages/docs/search"
import { Container } from "@/components/shared/page-container"

export function Header() {
	return (
		<header className="sticky top-0 z-30 w-full bg-transparent backdrop-blur-sm">
			<Container>
				<div className="flex h-(--header-height) items-center justify-between">
					<a href="/" className="font-bold text-xl">
						Marval UI
					</a>
					<Search />
				</div>
			</Container>
		</header>
	)
}
