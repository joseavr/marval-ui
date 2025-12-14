/** biome-ignore-all lint/suspicious/noArrayIndexKey: It's fine to use array's index as key since we're not mutating the array */
"use client"

import { DotsGrid, RefreshCcw01 } from "@untitledui/icons"
import { useAtomValue, useSetAtom } from "jotai"
import type React from "react"
import {
	createContext,
	forwardRef,
	useContext,
	useReducer,
	useRef,
	useState
} from "react"

import { SettingIcon } from "@/components/icons/setting-icon"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { type ComponentProperties, Index } from "@/registry"
import { gridAtom } from "@/store/grid-atom"

interface ComponentPreviewProps {
	demoName: keyof typeof Index
	className?: string
	demoComponent: React.ReactElement
	children: React.ReactNode
	align?: "start" | "center" | "end"
}

function ComponentPreview({
	className,
	align = "center",
	children,
	demoComponent,
	demoName
}: ComponentPreviewProps) {
	const [key, setKey] = useState(0)
	const setWithGrid = useSetAtom(gridAtom)
	const withGrid = useAtomValue(gridAtom)

	if (!demoName)
		throw new Error("component-preview.tsx:ComponentPreview - demoName must be provided")

	return (
		<div className={`w-full flex-1 *:data-[slot=alert]:first:mt-0 ${className ?? ""}`}>
			<div className="relative mt-4 mb-12 flex flex-col gap-2">
				<Tabs defaultValue="preview">
					<TabsList>
						<TabsTrigger value="preview">Preview</TabsTrigger>
						<TabsTrigger value="code">Code</TabsTrigger>
					</TabsList>
					<TabsContent
						data-grid={withGrid}
						value="preview"
						className="md:-mx-1 relative rounded-lg border data-[state=active]:border-border data-[grid=true]:bg-dotted"
					>
						<ComponentPreviewDemoProvider demoName={demoName}>
							<div
								data-id="component-preview-demo-header"
								className="absolute top-0 left-0 flex w-full items-center justify-between"
							>
								<div className="flex items-center justify-start gap-2 p-4">
									<Toggle
										size="sm"
										variant="default"
										defaultChecked={withGrid}
										pressed={withGrid}
										onPressedChange={setWithGrid}
									>
										<DotsGrid />
									</Toggle>
								</div>
								<div className="flex items-center justify-end gap-2 p-4">
									<RerenderComponentButton onClick={() => setKey((prev) => prev + 1)} />
									<ComponentPreviewInspectorPopover />
								</div>
							</div>
							<ComponentPreviewDemo align={align} key={key}>
								{demoComponent}
							</ComponentPreviewDemo>
						</ComponentPreviewDemoProvider>
					</TabsContent>
					<TabsContent value="code">{children}</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}

const RerenderComponentButton = forwardRef<
	HTMLButtonElement,
	React.ComponentProps<"button">
>(({ className, onClick }, ref) => {
	const iconRef = useRef<SVGSVGElement | null>(null)

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (!onClick) return
		onClick(e)

		const iconElement = iconRef.current
		if (!iconElement) return
		// Restart animation
		iconElement.classList.remove("animate-rotate")
		// Force reflow by accessing layout property
		void (
			iconElement.parentElement?.offsetWidth ?? iconElement.getBoundingClientRect().width
		)
		// Animate
		iconElement.classList.add("animate-rotate")
	}

	return (
		<Button
			ref={ref}
			className={className}
			variant="secondary"
			size="icon"
			onClick={handleClick}
		>
			<RefreshCcw01 ref={iconRef} />
		</Button>
	)
})
RerenderComponentButton.displayName = "RerenderComponentButton"

function ComponentPreviewDemo({
	align = "center",
	children
}: {
	align?: "start" | "center" | "end"
	children: React.ReactNode
}) {
	return (
		<div
			data-id="component-preview-demo"
			data-align={align}
			className="flex min-h-[450px] w-full justify-center p-10 data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center"
		>
			{children}
		</div>
	)
}

function ComponentPreviewInspectorPopover() {
	const { dispatch, properties, state } = useComponentPreviewDemoContext()
	return (
		<Popover>
			<PopoverTrigger asChild className="relative">
				<Button variant="secondary" size="icon">
					<SettingIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="relative w-80"
				align="end"
				sideOffset={-40}
				alignOffset={-8}
			>
				<div className="grid gap-4 text-xs">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Properties</h4>
						<p className="text-muted-foreground text-sm">
							Set different styles for this component.
						</p>
					</div>
					<div data-id="properties" className="grid gap-2">
						{Object.entries(properties).map(([propertyLabel, property]) => {
							if (property.type === "boolean") {
								return (
									<div
										key={propertyLabel}
										className="grid grid-cols-3 items-center gap-4"
									>
										<label htmlFor={propertyLabel}>{propertyLabel}</label>
										<Switch
											id={propertyLabel}
											checked={state[propertyLabel] as boolean}
											onCheckedChange={(checked) => {
												dispatch({
													type: "set",
													key: propertyLabel,
													value: checked
												})
											}}
										/>
									</div>
								)
							}

							return (
								<div key={propertyLabel} className="grid grid-cols-3 items-center gap-4">
									<label htmlFor={propertyLabel}>{propertyLabel}</label>
									<Select
										value={state[propertyLabel] as string}
										onValueChange={(value: string) => {
											dispatch({
												type: "set",
												key: propertyLabel,
												value: value
											})
										}}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder={`Select ${propertyLabel}`} />
										</SelectTrigger>
										<SelectContent>
											{property.enum?.map((option, index) => {
												return (
													<SelectGroup key={index}>
														<SelectItem value={option}>{option}</SelectItem>
													</SelectGroup>
												)
											})}
										</SelectContent>
									</Select>
								</div>
							)
						})}
					</div>
				</div>
				<PopoverClose asChild className="absolute top-2 right-2">
					<Button variant="secondary" size="icon">
						<SettingIcon />
					</Button>
				</PopoverClose>
			</PopoverContent>
		</Popover>
	)
}

type ComponentState<T extends ComponentProperties> = {
	[K in keyof T]: T[K]["default"]
}

type ComponentAction<T extends ComponentProperties> = {
	type: "set"
	key: keyof T
	value: T[keyof T]["default"]
}

function buildInitialState<T extends ComponentProperties>(
	properties: T
): ComponentState<T> {
	return Object.fromEntries(
		Object.entries(properties).map(([key, config]) => [key, config.default])
	) as ComponentState<T>
}

function componentReducer<T extends ComponentProperties>(
	state: ComponentState<T>,
	action: ComponentAction<T>
): ComponentState<T> {
	if (action.type === "set") {
		return { ...state, [action.key]: action.value }
	}

	return state
}

type ComponentPreviewDemoContextType = {
	state: ComponentState<ComponentProperties>
	dispatch: React.ActionDispatch<[action: ComponentAction<ComponentProperties>]>
	properties: ComponentProperties
}

const ComponentPreviewDemoContext = createContext<
	ComponentPreviewDemoContextType | undefined
>(undefined)

function ComponentPreviewDemoProvider({
	demoName,
	children
}: {
	demoName: keyof typeof Index
	children: React.ReactNode
}) {
	const properties = Index[demoName]

	const [state, dispatch] = useReducer(
		componentReducer<ComponentProperties>,
		properties,
		buildInitialState<ComponentProperties>
	)

	return (
		<ComponentPreviewDemoContext value={{ state, dispatch, properties }}>
			{children}
		</ComponentPreviewDemoContext>
	)
}

function useComponentPreviewDemoContext() {
	const context = useContext(ComponentPreviewDemoContext)
	if (!context)
		throw new Error(
			"useComponentPreviewContext must be used within ComponentPreviewContext"
		)
	return context
}

export { ComponentPreview, ComponentPreviewDemoProvider, useComponentPreviewDemoContext }
