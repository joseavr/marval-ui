import { create } from "zustand"
import { persist, type StorageValue } from "zustand/middleware"

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

interface PackageManagerStore {
	packageManager: PackageManager
	setPackageManager: (manager: PackageManager) => void
}

const isValidPackageManager = (value: string | null): value is PackageManager => {
	return value !== null && ["npm", "pnpm", "yarn", "bun"].includes(value)
}

export const usePackageManagerStore = create<PackageManagerStore>()(
	persist(
		(set) => ({
			packageManager: "pnpm",
			setPackageManager: (manager: PackageManager) => set({ packageManager: manager })
		}),
		{
			name: "codeblock-package-manager",
			storage: {
				getItem: (name: string): StorageValue<PackageManagerStore> | null => {
					if (typeof window === "undefined") return null
					const value = localStorage.getItem(name)
					if (!value) return null
					try {
						const parsed = JSON.parse(value) as {
							state?: { packageManager?: string }
						}
						if (
							parsed?.state?.packageManager &&
							isValidPackageManager(parsed.state.packageManager)
						) {
							return parsed as StorageValue<PackageManagerStore>
						}
					} catch {
						// Invalid JSON, fall through to default
					}
					return null
				},
				setItem: (name: string, value: StorageValue<PackageManagerStore>): void => {
					if (typeof window === "undefined") return
					localStorage.setItem(name, JSON.stringify(value))
				},
				removeItem: (name: string): void => {
					if (typeof window === "undefined") return
					localStorage.removeItem(name)
				}
			}
		}
	)
)
