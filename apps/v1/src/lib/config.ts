import type { SVGProps } from "react"

import { AtomIcon } from "@/components/icons/atom-icon"
import { ComponentIcon } from "@/components/icons/component-icon"
import { MenuIcon } from "@/components/icons/menu-icon"
import { SnippetIcon } from "@/components/icons/snippet-icon"
import { ToolIcon } from "@/components/icons/tool-icon"

type AppSidebarDataType = {
	groupLabel: string
	icon: React.FC<SVGProps<SVGSVGElement>>
	items: Array<{ label: string; url: string; disabled?: boolean }>
}[]

export const sidebar_data: AppSidebarDataType = [
	{
		groupLabel: "overview",
		icon: MenuIcon,
		items: [
			{ label: "Introduction", url: "/docs/introduction" },
			{ label: "Installation", url: "/docs/installation" },
			{ label: "Roadmap", url: "/docs/roadmap", disabled: true },
			{ label: "Changelog", url: "/docs/changelog", disabled: true },
			{ label: "MCP", url: "/docs/mcp", disabled: true }
		]
	},
	{
		groupLabel: "components",
		icon: ComponentIcon,
		items: [
			{ label: "Tree", url: "/docs/components/tree", disabled: true },
			{ label: "Dropzone", url: "/docs/components/upload", disabled: true },
			{ label: "File Upload", url: "/docs/components/file-upload", disabled: true },
			{ label: "Timeline", url: "/docs/components/timeline", disabled: true },
			{ label: "Spoiler", url: "/docs/components/spoiler", disabled: true },
			{
				label: "Inifinty Scroll",
				url: "/docs/components/infinity-scroll",
				disabled: true
			},
			{ label: "QR Code", url: "/docs/components/qr", disabled: true },
			{ label: "Video Player", url: "/docs/components/video-player", disabled: true },
			{ label: "Sortable List", url: "/docs/components/sortable-list", disabled: true },
			{ label: "Tour", url: "/docs/components/tour", disabled: true }
			// { label: "Testing", url: "/docs/components/testing", disabled: true },
			// { label: "Testing1", url: "/docs/components/testing2", disabled: true },
			// { label: "Testing2", url: "/docs/components/testing3", disabled: true },
			// { label: "Testing3", url: "/docs/components/testing4", disabled: true },
			// { label: "Testing4", url: "/docs/components/testing5", disabled: true },
			// { label: "Testing5", url: "/docs/components/testing6", disabled: true },
			// { label: "Testing6", url: "/docs/components/testing7", disabled: true }
		]
	},
	{
		groupLabel: "utils",
		icon: ToolIcon,
		items: [{ label: "Rate Limit", url: "/docs/utils/rate-limit", disabled: true }]
	},
	{
		groupLabel: "hooks",
		icon: AtomIcon,
		items: [
			{ label: "Network Status", url: "/docs/hooks/network-status", disabled: true }
		]
	},
	{
		groupLabel: "snippets",
		icon: SnippetIcon,
		items: [
			{
				label: "Typescript Cheatsheet",
				url: "/docs/snippets/typescript-cheatsheet",
				disabled: true
			}
		]
	}
]
