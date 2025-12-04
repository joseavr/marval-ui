import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
				<h1 className="mb-4 text-center font-bold text-4xl">Marval UI</h1>
				<p className="mb-8 text-center text-gray-600">
					A modern component library built with React and Tailwind CSS
				</p>
				<div className="flex justify-center gap-4">
					<Button className="rounded-lg" variant="secondary">
						Comming soon
					</Button>
				</div>
			</div>
		</main>
	)
}
