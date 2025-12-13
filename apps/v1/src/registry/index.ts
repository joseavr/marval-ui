import type { ButtonVariantProps } from "@/components/ui/button"

type PropertyConfig =
	| {
			type: "array"
			enum: string[]
			default: string
	  }
	| {
			type: "boolean"
			default: boolean
	  }

type ComponentProperties = Record<string, PropertyConfig>

const Index = {
	"button-demo": {
		disabled: {
			type: "boolean",
			default: false
		},
		variant: {
			type: "array",
			enum: [
				"default",
				"destructive",
				"outline",
				"secondary",
				"ghost",
				"link"
			] as NonNullable<ButtonVariantProps["variant"]>[],
			default: "default" as Extract<ButtonVariantProps["variant"], "default">
		},
		size: {
			type: "array",
			enum: ["default", "sm", "lg", "icon-sm", "icon", "icon-lg"] as NonNullable<
				ButtonVariantProps["size"]
			>[],
			default: "default" as Extract<ButtonVariantProps["size"], "default">
		}
	},
	"switch-demo": {
		checked: {
			type: "boolean",
			default: false
		}
	}
	// "tree-demo": {},
	// "file-upload-demo": {}
} satisfies Record<string, ComponentProperties>

export { type PropertyConfig, type ComponentProperties, Index }
