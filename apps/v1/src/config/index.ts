import type { SVGProps } from "react"

import { AtomIcon } from "@/components/icons/atom-icon"
import { ComponentIcon } from "@/components/icons/component-icon"
import { MenuIcon } from "@/components/icons/menu-icon"
import { SnippetIcon } from "@/components/icons/snippet-icon"
import { ToolIcon } from "@/components/icons/tool-icon"

type AppSidebarDataType = {
	groupLabel: string
	icon: React.FC<SVGProps<SVGSVGElement>>
	items: Array<{ label: string; href: string; disabled?: boolean }>
}[]

const SidebarConfig: AppSidebarDataType = [
	{
		groupLabel: "overview",
		icon: MenuIcon,
		items: [
			{ label: "Introduction", href: "/docs/introduction" },
			{ label: "Installation", href: "/docs/installation" },
			// { label: "Roadmap", href: "/docs/roadmap", disabled: true },
			{ label: "Changelog", href: "/docs/changelog", disabled: true }
			// { label: "MCP", href: "/docs/mcp", disabled: true }
		]
	},
	{
		groupLabel: "components",
		icon: ComponentIcon,
		items: [
			{ label: "Button", href: "/docs/components/button" },
			{ label: "Copy Button", href: "/docs/components/copy-button" },
			// { label: "Tree", href: "/docs/components/tree", disabled: true },
			{ label: "File Upload", href: "/docs/components/file-upload" },
			{ label: "Timeline", href: "/docs/components/timeline", disabled: true },
			// { label: "Spoiler", href: "/docs/components/spoiler", disabled: true },
			// {
			// 	label: "Inifinty Scroll",
			// 	href: "/docs/components/infinity-scroll",
			// 	disabled: true
			// },
			// { label: "QR Code", href: "/docs/components/qr", disabled: true },
			// { label: "Video Player", href: "/docs/components/video-player", disabled: true },
			{ label: "Sortable List", href: "/docs/components/sortable-list", disabled: true }
			// { label: "Tour", href: "/docs/components/tour", disabled: true }
		]
	},
	{
		groupLabel: "utils",
		icon: ToolIcon,
		items: [{ label: "Rate Limit", href: "/docs/utils/rate-limit", disabled: true }]
	},
	{
		groupLabel: "hooks",
		icon: AtomIcon,
		items: [
			{ label: "Network Status", href: "/docs/hooks/network-status" }
		]
	},
	{
		groupLabel: "snippets",
		icon: SnippetIcon,
		items: [
			{
				label: "Typescript Cheatsheet",
				href: "/docs/snippets/typescript-cheatsheet"
			}
		]
	}
]

export const AppConfig = {
	name: "Marval UI",
	url: "",
	ogImage: "",
	description: "",
	links: {
		github: "https://github.com/joseavr/marval-ui",
		twitter: "",
		discord: "",
		instagram: ""
	},
	sidebar: SidebarConfig
}
