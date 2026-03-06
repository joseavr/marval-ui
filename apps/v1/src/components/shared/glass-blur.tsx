import { cn } from "@/lib/utils"

export function GlassBlur({ className }: { className?: string }) {
	const layers = [
		{
			z: 1,
			blur: 0.078125,
			mask: "linear-gradient(transparent 0%, black 12.5%, black 25%, transparent 37.5%)"
		},
		{
			z: 2,
			blur: 0.15625,
			mask: "linear-gradient(transparent 12.5%, black 25%, black 37.5%, transparent 50%)"
		},
		{
			z: 3,
			blur: 0.3125,
			mask: "linear-gradient(transparent 25%, black 37.5%, black 50%, transparent 62.5%)"
		},
		{
			z: 4,
			blur: 0.625,
			mask: "linear-gradient(transparent 37.5%, black 50%, black 62.5%, transparent 75%)"
		},
		{
			z: 5,
			blur: 1.25,
			mask: "linear-gradient(transparent 50%, black 62.5%, black 75%, transparent 87.5%)"
		},
		{
			z: 6,
			blur: 2.5,
			mask: "linear-gradient(transparent 62.5%, black 75%, black 87.5%, transparent 100%)"
		},
		{ z: 7, blur: 5, mask: "linear-gradient(transparent 75%, black 87.5%, black 100%)" },
		{ z: 8, blur: 10, mask: "linear-gradient(transparent 87.5%, black 100%)" }
	]

	return (
		<div
			data-slot="glass-blur"
			className={cn(
				"pointer-events-none fixed right-0 bottom-0 left-0 z-50 h-[100px] select-none",
				className
			)}
		>
			<div className="absolute inset-0 overflow-hidden">
				{layers.map((layer) => (
					<div
						key={layer.z}
						className="pointer-events-none absolute inset-0"
						style={{
							zIndex: layer.z,
							backdropFilter: `blur(${layer.blur}px)`,
							WebkitBackdropFilter: `blur(${layer.blur}px)`,
							maskImage: layer.mask,
							WebkitMaskImage: layer.mask
						}}
					/>
				))}
			</div>
		</div>
	)
}

export function GlassViewportBlur({
	height = 100,
	layers = 8,
	maxBlur = 10,
	position = "bottom",
	className = ""
}: {
	height?: number
	layers?: number
	maxBlur?: number
	position?: "top" | "bottom"
	className?: string
}) {
	const layerArray = Array.from({ length: layers })

	return (
		<div
			className={`pointer-events-none fixed right-0 left-0 select-none ${className}`}
			style={{
				height,
				zIndex: 50,
				...(position === "bottom" ? { bottom: 0 } : { top: 0 })
			}}
		>
			<div className="absolute inset-0 overflow-hidden">
				{layerArray.map((_, i) => {
					const start = (i / layers) * 100
					const mid1 = ((i + 1) / layers) * 100
					const mid2 = ((i + 2) / layers) * 100
					const end = ((i + 3) / layers) * 100

					const blur = maxBlur * ((i + 1) / layers) ** 2

					const mask = `linear-gradient(
            transparent ${start}%,
            black ${mid1}%,
            black ${mid2}%,
            transparent ${end}%
          )`

					return (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: it's fine
							key={i}
							className="absolute inset-0"
							style={{
								zIndex: i + 1,
								backdropFilter: `blur(${blur}px)`,
								WebkitBackdropFilter: `blur(${blur}px)`,
								maskImage: mask,
								WebkitMaskImage: mask
							}}
						/>
					)
				})}
			</div>
		</div>
	)
}
