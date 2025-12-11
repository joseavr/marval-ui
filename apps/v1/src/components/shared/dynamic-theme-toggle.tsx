"use client"

import dynamic from "next/dynamic"

import { Skeleton } from "@/components/ui/skeleton"

export const DynamicThemeToggle = dynamic(
	() => import("@/components/shared/theme-toggle").then((mod) => mod.ThemeToggle),
	{
		ssr: false,
		loading: () => <Skeleton className="h-8 w-[84px] rounded-lg" />
	}
)
