"use client"

import { useAtomValue, useSetAtom } from "jotai"

import { LayoutFullIcon, LayoutZenIcon } from "@/components/icons/layout-icon"
import { Button, type ButtonVariantProps } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { layoutAtom } from "@/store/layout-atom"

export function LayoutToggle({
	className,
	variant,
	size
}: ButtonVariantProps & { className?: string }) {
	const layout = useAtomValue(layoutAtom)
	const setLayout = useSetAtom(layoutAtom)

	return layout === "zen" ? (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					onClick={() => setLayout("full")}
					variant={variant ?? "secondary"}
					size={size ?? "icon-sm"}
					className={className}
				>
					<LayoutFullIcon />
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<span>Switch to Full Layout</span>
			</TooltipContent>
		</Tooltip>
	) : (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					onClick={() => setLayout("zen")}
					variant={variant ?? "secondary"}
					size={size ?? "icon-sm"}
					className={className}
				>
					<LayoutZenIcon />
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<span>Switch to Zen Mode</span>
			</TooltipContent>
		</Tooltip>
	)
}
