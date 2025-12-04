import { DocsSideBar } from "@/components/pages/docs/sidebar"
import { Footer } from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import { Container } from "@/components/shared/page-container"
import { BaseLayout } from "@/components/shared/root-layout"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
	return (
		<BaseLayout>
			<Header />
			{/* <div className="h-4 w-full"></div> */}
			<div className="flex flex-1 flex-col">
				<Container className="relative flex items-start">
					<DocsSideBar />
					<main id="rightside" className="h-full w-full">
						{children}
					</main>
				</Container>
			</div>
			<Footer />
		</BaseLayout>
	)
}
