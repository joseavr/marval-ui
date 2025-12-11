import Link from "next/link"

import { GithubIcon } from "@/components/icons/github-icon"
import { Button, type ButtonVariantProps } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AppConfig } from "@/config/app"

export function GitHubLink({
	className,
	variant,
	size
}: ButtonVariantProps & { className?: string }) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					asChild
					size={size ?? "lg"}
					variant={variant ?? "ghost"}
					className="h-8 shadow-none"
				>
					<Link
						href={AppConfig.links.github}
						target="_blank"
						rel="noreferrer"
						className={className}
					>
						<GithubIcon />
						{/* <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
                <StarsCount />
              </React.Suspense> */}
					</Link>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>View on GitHub</p>
			</TooltipContent>
		</Tooltip>
	)
}
