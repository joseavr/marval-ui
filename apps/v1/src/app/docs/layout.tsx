import { DocsSideBar } from "@/components/pages/docs/sidebar"
import { AppFooter } from "@/components/shared/app-footer"
import { AppHeader } from "@/components/shared/app-header"
import { Container } from "@/components/shared/page-container"
import { RootLayout } from "@/components/shared/root-layout"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
	return (
		<RootLayout>
			<AppHeader />
			{/* <div className="h-4 w-full"></div> */}
			<div className="flex flex-1 flex-col">
				<Container className="relative flex items-start">
					<DocsSideBar />
					<main data-id="docs-rightside" className="h-full w-full">
						{children}
					</main>
				</Container>
			</div>
			<AppFooter />
		</RootLayout>
	)
}
