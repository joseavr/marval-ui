"use client"

import { RefreshCcw01 } from "@untitledui/icons"
import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ComponentPreviewProps {
	className?: string
	demoComponent: React.ReactElement
	children: React.ReactNode
	align?: "start" | "center" | "end"
}

export function ComponentPreview({
	className,
	align = "center",
	children,
	demoComponent
}: ComponentPreviewProps) {
	const [key, setKey] = useState(0)

	return (
		<div className={`w-full flex-1 *:data-[slot=alert]:first:mt-0 ${className ?? ""}`}>
			<div className="relative mt-4 mb-12 flex flex-col gap-2">
				<Tabs defaultValue="preview">
					<TabsList>
						<TabsTrigger value="preview">Preview</TabsTrigger>
						<TabsTrigger value="code">Code</TabsTrigger>
					</TabsList>
					<TabsContent
						value="preview"
						className="md:-mx-1 relative rounded-lg border data-[state=active]:border-border"
					>
						<div data-id="header" className="absolute top-0 left-0 w-full">
							<div className="flex items-center justify-end gap-2 p-4">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setKey((prev) => prev + 1)}
								>
									<RefreshCcw01 />
								</Button>
							</div>
						</div>

						<ComponentPreviewDemo align={align} key={key}>
							{demoComponent}
						</ComponentPreviewDemo>
					</TabsContent>
					<TabsContent value="code">{children}</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

function ComponentPreviewDemo({
	align = "center",
	children
}: {
	align?: "start" | "center" | "end"
	children: React.ReactNode
}) {
	return (
		<div
			data-id="preview"
			data-align={align}
			className="flex min-h-[450px] w-full justify-center p-10 data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center"
		>
			{children}
		</div>
	)
}
