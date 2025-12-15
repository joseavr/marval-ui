"use client"

import { InfoCircle } from "@untitledui/icons"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function Info({ className, children, ...props }: React.ComponentProps<"button">) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					size="icon-sm"
					variant="ghost"
					className={cn("ml-0 align-middle hover:bg-transparent")}
					{...props}
				>
					<InfoCircle />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className={cn("w-96 max-w-fit rounded-xl px-3 py-2 text-sm leading-7", className)}
			>
				{children}
			</PopoverContent>
		</Popover>
	)
}
