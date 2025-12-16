import type { ButtonVariantProps } from "@/registry/button"
import type { CopyButtonVariantProps } from "@/registry/copy-button"

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
	| {
			type: "input"
			default: string
	  }
	| {
			type: "number"
			default: number
	  }
  // | {
  //   type: "children" 
  // }

type ComponentProperties = Record<string, PropertyConfig>

const Index = {
	"button-demo": {
		disabled: {
			type: "boolean",
			default: false
		},
		loading: {
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
				"link",
				"brand-primary",
				"brand-secondary",
				"brand-tertiary",
				"brand-neutral-primary",
				"brand-neutral-secondary",
				"brand-neutral-tertiary",
				"brand-destructive-primary",
				"brand-destructive-secondary",
				"brand-destructive-tertiary"
			] as NonNullable<ButtonVariantProps["variant"]>[],
			default: "default" satisfies Extract<ButtonVariantProps["variant"], "default">
		},
		size: {
			type: "array",
			enum: ["default", "sm", "lg", "icon-sm", "icon", "icon-lg"] as NonNullable<
				ButtonVariantProps["size"]
			>[],
			default: "default" satisfies Extract<ButtonVariantProps["size"], "default">
		}
	},
	"copy-button-demo": {
		textToCopy: {
			type: "input",
			default: "Merry Christmas 🎄⛄❄️"
		},
		animationDuration: {
			type: "number",
			default: 2000
		},
		variant: {
			type: "array",
			enum: [
				"default",
				"destructive",
				"outline",
				"secondary",
				"ghost",
				"link",
				"brand-primary",
				"brand-secondary",
				"brand-tertiary",
				"brand-neutral-primary",
				"brand-neutral-secondary",
				"brand-neutral-tertiary",
				"brand-destructive-primary",
				"brand-destructive-secondary",
				"brand-destructive-tertiary"
			] as NonNullable<CopyButtonVariantProps["variant"]>[],
			default: "outline" satisfies Extract<CopyButtonVariantProps["variant"], "outline">
		},
		size: {
			type: "array",
			enum: ["default", "sm", "lg", "icon-sm", "icon", "icon-lg"] as NonNullable<
				CopyButtonVariantProps["size"]
			>[],
			default: "sm" satisfies Extract<CopyButtonVariantProps["size"], "sm">
		}
	}
} satisfies Record<string, ComponentProperties>

export { type PropertyConfig, type ComponentProperties, Index }
