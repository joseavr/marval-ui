import { Search } from "@/components/search"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen">
			<nav className="border-b">
				<div className="container mx-auto flex items-center justify-between px-4 py-4">
					<a href="/" className="font-bold text-xl">
						Marval UI
					</a>
					<Search />
				</div>
			</nav>
			<div className="container mx-auto px-4 py-8">{children}</div>
		</div>
	)
}
